export enum eRealtionship {
    BelongsTo = "BelongsTo",
    Has = "Has"
};

export interface IRelationship {
    belongsTo: string;
    has: string;
}
