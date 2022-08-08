import { DegreeType } from "./Education.entity";

export interface EducationDetails {
    school: string;
    fieldOfStudy: string;
    degree: DegreeType;
    startYear: number;
    endYear: number;
    gpa?: number;
}
