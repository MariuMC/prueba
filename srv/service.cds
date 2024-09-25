using { entrenamiento, sap.common } from '../db/schemas';

service AdminService {

    type inText : {
        comment : String;
    };    
    
    entity Estudiantes as projection on entrenamiento.Alumnos actions{
        @Common.IsActionCritical
        action notificaAlumno();
        @Common.IsActionCritical
        action inactivaAlumno(text:inText:comment);
    };
    entity Cursos as projection on entrenamiento.Cursos;
    annotate Estudiantes with @odata.draft.enabled;
    annotate Estudiantes with @odata.draft.bypass;
    annotate Cursos with @odata.draft.enabled;
    annotate Cursos with @odata.draft.bypass;
}

service EstudiantesService {
    @readonly
    view EstudiantesByCurso as
    select from entrenamiento.Cursos as CursosEstudiantes{
        key ID,
        Nombre,
        estudiantes.Nombre as NombreEstudiante,
        estudiantes.FechaNac as FechaNacimiento
    }

}

annotate AdminService.inText:comment with @Common.Label : 'Comentarios';
annotate AdminService.inText:comment with @UI.MultiLineText : true;