import { SessionStorageDto } from '../../../compartido/entity/SessionStorageDto';
export class AuditTableEntity
{
    public CreationUser: string = "";
    public CreationDate: Date = new Date();
    public ModifyUser?: any = "";
    public ModifyDate: Date = new Date();
    public Status: string = "A";

    public constructor()
    {
        
    }

    
}