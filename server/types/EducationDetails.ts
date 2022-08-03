import { DegreeType } from '../models/Education';

export interface EducationDetails {
    school: string;
    fieldOfStudy: string;
    degree: DegreeType;
    startYear: number;
    endYear: number;
    gpa?: number;
}
