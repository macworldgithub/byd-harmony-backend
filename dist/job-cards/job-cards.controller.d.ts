import { JobCardsService } from './job-cards.service';
import { CreateJobCardDto, UpdateJobCardDto, JobCardItemDto } from './dto/job-card.dto';
export declare class JobCardsController {
    private readonly jobCardsService;
    constructor(jobCardsService: JobCardsService);
    create(createJobCardDto: CreateJobCardDto): Promise<import("./schemas/job-card.schema").JobCard>;
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<import("./schemas/job-card.schema").JobCard>;
    update(id: string, updateJobCardDto: UpdateJobCardDto): Promise<import("./schemas/job-card.schema").JobCard>;
    remove(id: string): Promise<import("./schemas/job-card.schema").JobCard>;
    addItem(id: string, itemDto: JobCardItemDto): Promise<import("./schemas/job-card.schema").JobCard>;
    updateItem(id: string, itemId: string, itemDto: any): Promise<import("./schemas/job-card.schema").JobCard>;
    removeItem(id: string, itemId: string): Promise<import("./schemas/job-card.schema").JobCard>;
}
