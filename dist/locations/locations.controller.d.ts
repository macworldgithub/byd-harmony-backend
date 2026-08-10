import { LocationsService } from './locations.service';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    create(createLocationDto: CreateLocationDto): Promise<import("./schemas/location.schema").Location>;
    getDropdown(): Promise<any[]>;
    findAll(query: any): Promise<import("./schemas/location.schema").Location[]>;
    findOne(id: string): Promise<import("./schemas/location.schema").Location>;
    update(id: string, updateLocationDto: UpdateLocationDto): Promise<import("./schemas/location.schema").Location>;
    remove(id: string): Promise<import("./schemas/location.schema").Location>;
}
