// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression} from "@subql/types-core";
import assert from 'assert';



export type ExtrinsicsProps = Omit<Extrinsics, NonNullable<FunctionPropertyNames<Extrinsics>>| '_name'>;

export class Extrinsics implements Entity {

    constructor(
        
        id: string,
    ) {
        this.id = id;
        
    }

    public id: string;
    public blockNumber?: bigint;
    public index?: bigint;
    public success?: boolean;
    

    get _name(): string {
        return 'Extrinsics';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Extrinsics entity without an ID");
        await store.set('Extrinsics', id.toString(), this);
    }

    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Extrinsics entity without an ID");
        await store.remove('Extrinsics', id.toString());
    }

    static async get(id:string): Promise<Extrinsics | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Extrinsics entity without an ID");
        const record = await store.get('Extrinsics', id.toString());
        if (record) {
            return this.create(record as ExtrinsicsProps);
        } else {
            return;
        }
    }

    static async getByFields(filter: FieldsExpression<ExtrinsicsProps>[], options?: { offset?: number, limit?: number}): Promise<Extrinsics[]> {
        const records = await store.getByFields('Extrinsics', filter, options);
        return records.map(record => this.create(record as ExtrinsicsProps));
    }

    static create(record: ExtrinsicsProps): Extrinsics {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
            record.id,
        );
        Object.assign(entity,record);
        return entity;
    }
}
