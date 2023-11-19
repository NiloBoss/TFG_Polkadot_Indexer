// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression} from "@subql/types-core";
import assert from 'assert';



export type CollatorProps = Omit<Collator, NonNullable<FunctionPropertyNames<Collator>>| '_name'>;

export class Collator implements Entity {

    constructor(
        
        id: string,
        joinedDate: Date,
    ) {
        this.id = id;
        this.joinedDate = joinedDate;
        
    }

    public id: string;
    public joinedDate: Date;
    public leaveDate?: Date;
    

    get _name(): string {
        return 'Collator';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Collator entity without an ID");
        await store.set('Collator', id.toString(), this);
    }

    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Collator entity without an ID");
        await store.remove('Collator', id.toString());
    }

    static async get(id:string): Promise<Collator | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Collator entity without an ID");
        const record = await store.get('Collator', id.toString());
        if (record) {
            return this.create(record as CollatorProps);
        } else {
            return;
        }
    }

    static async getByFields(filter: FieldsExpression<CollatorProps>[], options?: { offset?: number, limit?: number}): Promise<Collator[]> {
        const records = await store.getByFields('Collator', filter, options);
        return records.map(record => this.create(record as CollatorProps));
    }

    static create(record: CollatorProps): Collator {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
            record.id,
            record.joinedDate,
        );
        Object.assign(entity,record);
        return entity;
    }
}
