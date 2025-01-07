export enum AcademicDegree {
    No_Certificate = 'No_Certificate',
    Bachelor = 'Bachelor',
    Certificate = 'Certificate',
    Diploma = 'Diploma',
    Higher_Diploma = 'Higher_Diploma',
    Lawyer_Certificate = 'Lawyer_Certificate',
    MBA = 'MBA',
    Master = 'Master',
    PhD = 'PhD',
    Post_Graduation = 'Post_Graduation',
    Post_Graduation_Diploma = 'Post_Graduation_Diploma',
    Others = 'Others',
}

export const academicDegreeArray: AcademicDegree[] = [
    AcademicDegree.No_Certificate,
    AcademicDegree.Bachelor,
    AcademicDegree.Certificate,
    AcademicDegree.Diploma,
    AcademicDegree.Higher_Diploma,
    AcademicDegree.Lawyer_Certificate,
    AcademicDegree.MBA,
    AcademicDegree.Master,
    AcademicDegree.PhD,
    AcademicDegree.Post_Graduation,
    AcademicDegree.Post_Graduation_Diploma,
    AcademicDegree.Others,
];

export const mapAcademicDegree: { [key in AcademicDegree]: string } = {
    [AcademicDegree.No_Certificate]: 'No certificate',
    [AcademicDegree.Bachelor]: 'Bachelor',
    [AcademicDegree.Certificate]: 'Certificate',
    [AcademicDegree.Diploma]: 'Diploma',
    [AcademicDegree.Higher_Diploma]: 'Higher diploma',
    [AcademicDegree.Lawyer_Certificate]: 'Lawyer certificate',
    [AcademicDegree.MBA]: 'MBA',
    [AcademicDegree.Master]: 'Master',
    [AcademicDegree.PhD]: 'PhD',
    [AcademicDegree.Post_Graduation]: 'Post graduation',
    [AcademicDegree.Post_Graduation_Diploma]: 'Post graduation diploma',
    [AcademicDegree.Others]: 'Others',
};
