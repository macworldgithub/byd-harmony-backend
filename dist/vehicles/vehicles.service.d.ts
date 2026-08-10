import { Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
export declare class VehiclesService {
    private vehicleModel;
    constructor(vehicleModel: Model<VehicleDocument>);
    create(createVehicleDto: CreateVehicleDto): Promise<Vehicle>;
    findAll(query: any): Promise<any>;
    search(query: any): Promise<any[]>;
    findOne(id: string): Promise<Vehicle>;
    update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle>;
    remove(id: string): Promise<Vehicle>;
}
