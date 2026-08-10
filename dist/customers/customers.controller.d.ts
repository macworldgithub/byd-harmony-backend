import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(createCustomerDto: CreateCustomerDto): Promise<import("./schemas/customer.schema").Customer>;
    search(q: string): Promise<any[]>;
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<import("./schemas/customer.schema").Customer>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<import("./schemas/customer.schema").Customer>;
    remove(id: string): Promise<import("./schemas/customer.schema").Customer>;
}
