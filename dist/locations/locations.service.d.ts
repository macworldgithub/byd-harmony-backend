import { Model } from 'mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto';
export declare class LocationsService {
    private locationModel;
    constructor(locationModel: Model<LocationDocument>);
    create(createLocationDto: CreateLocationDto): Promise<Location>;
    findAll(query: any): Promise<Location[]>;
    getDropdown(): Promise<any[]>;
    findOne(id: string): Promise<Location>;
    update(id: string, updateLocationDto: UpdateLocationDto): Promise<Location>;
    remove(id: string): Promise<Location>;
}
