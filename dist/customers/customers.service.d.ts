import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
export declare class CustomersService {
    private customerModel;
    constructor(customerModel: Model<CustomerDocument>);
    create(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    findAll(query: any): Promise<any>;
    search(q: string): Promise<any[]>;
    findOne(id: string): Promise<Customer>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer>;
    remove(id: string): Promise<Customer>;
}
