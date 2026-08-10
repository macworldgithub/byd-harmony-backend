import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/vehicle.dto';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    create(createVehicleDto: CreateVehicleDto): Promise<import("./schemas/vehicle.schema").Vehicle>;
    search(query: any): Promise<any[]>;
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<import("./schemas/vehicle.schema").Vehicle>;
    update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<import("./schemas/vehicle.schema").Vehicle>;
    remove(id: string): Promise<import("./schemas/vehicle.schema").Vehicle>;
}
