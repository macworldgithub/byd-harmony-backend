import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { UpdateContractorDto } from './dto/update-contractor.dto';
import { Contractor, ContractorDocument } from './schemas/contractor.schema';

@Injectable()
export class ContractorsService {
  constructor(
    @InjectModel(Contractor.name) private contractorModel: Model<ContractorDocument>,
  ) {}

  async create(createContractorDto: CreateContractorDto): Promise<Contractor> {
    const created = new this.contractorModel(createContractorDto);
    return created.save();
  }

  async findAll(): Promise<Contractor[]> {
    return this.contractorModel.find().exec();
  }

  async findOne(id: string): Promise<Contractor> {
    const contractor = await this.contractorModel.findById(id).exec();
    if (!contractor) {
      throw new NotFoundException(`Contractor #${id} not found`);
    }
    return contractor;
  }

  async update(id: string, updateContractorDto: UpdateContractorDto): Promise<Contractor> {
    const existing = await this.contractorModel
      .findByIdAndUpdate(id, updateContractorDto, { new: true })
      .exec();
    if (!existing) {
      throw new NotFoundException(`Contractor #${id} not found`);
    }
    return existing;
  }

  async remove(id: string): Promise<Contractor> {
    const deleted = await this.contractorModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Contractor #${id} not found`);
    }
    return deleted;
  }
}
