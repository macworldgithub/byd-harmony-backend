export declare class CreateReminderDto {
    clientId?: number;
    clientName?: string;
    title: string;
    dueAt: string;
    done?: number;
}
declare const UpdateReminderDto_base: import("@nestjs/common").Type<Partial<CreateReminderDto>>;
export declare class UpdateReminderDto extends UpdateReminderDto_base {
}
export {};
