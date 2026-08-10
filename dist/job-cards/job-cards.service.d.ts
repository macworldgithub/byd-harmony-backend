import { Model } from 'mongoose';
import { JobCard, JobCardDocument } from './schemas/job-card.schema';
import { CreateJobCardDto, UpdateJobCardDto, JobCardItemDto } from './dto/job-card.dto';
export declare class JobCardsService {
    private jobCardModel;
    constructor(jobCardModel: Model<JobCardDocument>);
    private generateOrderNumber;
    create(createJobCardDto: CreateJobCardDto): Promise<JobCard>;
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<JobCard>;
    update(id: string, updateJobCardDto: UpdateJobCardDto): Promise<JobCard>;
    remove(id: string): Promise<JobCard>;
    addItem(id: string, itemDto: JobCardItemDto): Promise<JobCard>;
    updateItem(id: string, itemId: string, itemDto: any): Promise<JobCard>;
    removeItem(id: string, itemId: string): Promise<JobCard>;
    private recalculateTotals;
}
