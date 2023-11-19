// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression} from "@subql/types-core";
import assert from 'assert';



export type BlockProps = Omit<Block, NonNullable<FunctionPropertyNames<Block>>| '_name'>;

export class Block implements Entity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public blockNumber?: bigint;
    public timeStamp?: Date;
    

    get _name(): string {
        return 'Block';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Block entity without an ID");
        await store.set('Block', id.toString(), this);
    }

    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Block entity without an ID");
        await store.remove('Block', id.toString());
    }

    static async get(id:string): Promise<Block | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Block entity without an ID");
        const record = await store.get('Block', id.toString());
        if (record) {
            return this.create(record as BlockProps);
        } else {
            return;
        }
    }

    static async getByFields(filter: FieldsExpression<BlockProps>[], options?: { offset?: number, limit?: number}): Promise<Block[]> {
        const records = await store.getByFields('Block', filter, options);
        return records.map(record => this.create(record as BlockProps));
    }

    static create(record: BlockProps): Block {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
