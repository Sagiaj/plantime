import db, { FirebaseAuth } from "@/plugins/firebase";
import { firestore } from "firebase/app";
import firebase from "@/plugins/firebase";
import { Collections } from "@/plugins/firebase/firebase-collections";
import { isEmpty } from "@/utilities/object-utility";
import UserSettings from '@/models/store/user-settings';
import { AuthUser } from '@/models/store/firebase-auth-user';
import Task from '@/models/store/task';
import tasks from '@/store/modules/tasks';

enum FirebaseCollectionSchema {
  USERS = "users",
  USER_TASKS = "user_tasks",
  USER_SETTINGS = "user_settings",
  TASK_LISTS = "task_lists"
}

export class FirebaseService {
  name: string = "FirebaseService";
  static db: firestore.Firestore = db;

  private static async getDB(
    col: Collections
  ): Promise<firestore.CollectionReference> {
    try {
      if (
        !Object.keys(FirebaseCollectionSchema).some(
          schema => schema.toLocaleLowerCase() == col
        )
      ) {
        return Promise.reject(`Collection "${col}" was not found.`);
      }
      return await FirebaseService.db.collection(col);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getOrSetFBDoc(
    documentRef: firestore.DocumentReference,
    defaultObject: object = {}
  ): Promise<firestore.DocumentReference> {
    try {
      if (!(await documentRef.get()).exists) {
        await documentRef.set(defaultObject);
      }
      return documentRef;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getOrSetFBCol(
    collectionRef: firestore.CollectionReference,
    defaultObject: object = {}
  ): Promise<firestore.CollectionReference> {
    try {
      if ((await collectionRef.get()).empty) {
        await collectionRef.add(defaultObject);
      }
      return collectionRef;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getUserTasks(user: AuthUser, task_ids?: any[], tag?: string): Promise<Task[]> {
    console.log("FirebaseService/getUserTasks - start");
    try {
        const col = await this.getDB(FirebaseCollectionSchema.USER_TASKS);
        let refs = await col.where("belongs_to_user_email", "==", user.email);
        if (task_ids && task_ids.length > 0) { refs = refs.where(firestore.FieldPath.documentId(), "in", task_ids); }
        if (tag) { refs = refs.where("tag_name", "==", tag); }
        const amendedRef = await refs.get();
        const tasks = amendedRef.docs.map(doc => new Task(<Task>doc.data()));

        console.log("FirebaseService/getUserTasks - end. tasks:", tasks);
        return tasks;
    } catch (err) {
        console.log("FirebaseService/getUserTasks - error:", err);
        return Promise.reject(err);
    }
  }

  static async saveUserTasks(user: AuthUser, tasks: Task[]): Promise<Task[]> {
    console.log("FirebaseService/saveUserTasks - start");
    const fb_batch = await firebase.batch();
    try {
        const col = await this.getDB(FirebaseCollectionSchema.USER_TASKS);
        for (let task of tasks) {
            fb_batch.set(col.doc(task._id), task);
        }

        await fb_batch.commit();
        return tasks;
    } catch (err) {
        console.log("FirebaseService/saveUserTasks - error:", err);
        return Promise.reject(err);
    }
  }

  static async saveUserTasksList(user: AuthUser, tasks_list: Task[]): Promise<Task[]> {
    console.log("FirebaseService/saveserTasksList - start");
    try {
      const col = await this.getDB(FirebaseCollectionSchema.TASK_LISTS);
      col.doc(user.email);
      return tasks_list;
    } catch(err) {
      console.log("FirebaseService/saveUserTasksList - error:", err);
      return Promise.reject(err);
    }
  }

  static async getUserTasksList(user: AuthUser, goal: string): Promise<Task[]> {
    console.log("FirebaseService/getUserTasksList - start");
    try {
      let tasks: Task[] = [];
      const listsRef = await (await this.getDB(FirebaseCollectionSchema.TASK_LISTS)).doc(user.email);
      const userTasksLists = await (await listsRef.get()).data();
      if (userTasksLists && userTasksLists[goal] && userTasksLists[goal].length > 0) {
        const tasksMap: { [key: string]: Task } = await(
          await this.getUserTasks(user, [...userTasksLists[goal]])
        ).reduce((o, task) => ({ ...o, [task._id]: task }), {});

        for (const taskId of userTasksLists[goal]) {
          tasks.push(tasksMap[taskId]);
        }
      }
      return tasks;
    } catch (err) {
      console.log("FirebaseService/getUserTasksList - error:", err);
      return Promise.reject(err);
    }
  }

  static async saveUserSettings(settings: UserSettings): Promise<UserSettings> {
    console.log("FirebaseService/saveUserSettings - start");
    console.log("FirebaseService/saveUserSettings - settings=", settings);
      try {
          const col = await this.getDB(FirebaseCollectionSchema.USER_SETTINGS);
          await this.getOrSetFBDoc(col.doc(settings.belongs_to_user_email), settings);

          return settings;
      } catch (err) {
          console.log("FirebaseService/saveUserSettings - error:", err);
          return Promise.reject(err);
      }
  }

  static async getUserSettings(user: AuthUser): Promise<UserSettings> {
    console.log("FirebaseService/getUserSettings - start");
    console.log("FirebaseService/getUserSettings - user=", user);
    try {
      const col = await this.getDB(FirebaseCollectionSchema.USER_SETTINGS);
      const refs = await col
      .where("belongs_to_user_email", "==", user.email)
      .limit(1)
      .get();
      const data = <UserSettings>refs.docs.map(doc => doc.data())[0];
      const settings = new UserSettings(data);
      settings.setUser(user);

      console.log("FirebaseService/getUserSettings - end. settings:", settings, data);
      return settings;
    } catch (err) {
      console.log("FirebaseService/getUserSettings - error:", err);
      return Promise.reject(err);
    }
  }

  static async addOrganization() {}

  // static async addAdmin

  // super admin - add organization
  // organization - add user
  // organization - add meal items
}
