import { BadRequestException, Injectable } from '@nestjs/common';
import { EventJournalService } from 'src/event-journal/event-journal.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
    constructor(private readonly prisma: PrismaService, private readonly eventJournalService: EventJournalService){}

    async allStudentsByGroupe(id: number){
        return this.prisma.student.findMany({
            where: {groupeId: Number(id)}
        })
    }

    async studentById(studentId: number){
        return this.prisma.student.findUnique({
            where: {id: Number(studentId)}
        })
    }

    async profile(id: number, sort: string, customRange?: string) {
        const user = await this.prisma.student.findUnique({
            where: { id: Number(id) },
            include: {
                groupe: {
                    include: {
                        department: true
                    }
                }
            }
        });
    
        if (!user) {
            throw new BadRequestException("Пользователя с таким id не существует");
        }
    
        const journal = await this.eventJournalService.getJournalForStudent(id, sort, customRange); // Передаем customRange
        const result = {
            id: user.id,
            fullName: user.fullName,
            groupeName: user.groupe.groupeName,
            departmentName: user.groupe.department.departmentName,
            gender: user.gender,
            dateOfBIrth: user.dateOfBirth,
            course: `${user.groupe.groupeName.charAt(0)} курс`,
            events: journal.events
        };
        return result;
    }
}
