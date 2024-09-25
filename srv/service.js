const cds = require('@sap/cds') 
const { SELECT, INSERT, UPDATE, DELETE } = cds.ql

module.exports = cds.service.impl(function(){
    this.before(['CREATE','UPDATE'], 'Estudiantes',function(req){
        console.log("Estudiantes called");
        if(req.data && !req.data.Nombre){
            req.error(400, 'Error - Debe indicar Nombre');
            //req.info(200, 'Info - Debe indicar Nombre');
            //req.warn(412, 'Warn - Debe indicar Nombre');
            //req.notify(412, 'Notify - Debe indicar Nombre');
        }
    })

    this.before(['CREATE','UPDATE'], 'Cursos',function(req){
        console.log("Cursos called");
        if(req.data && !req.data.Nombre){
            req.error(400, 'Error - Debe indicar Nombre');
            //req.info(200, 'Info - Debe indicar Nombre');
            //req.warn(412, 'Warn - Debe indicar Nombre');
            //req.notify(412, 'Notify - Debe indicar Nombre');
        }
        if(req.data && req.data.MaxEstudiantes > 30){
            req.error(400, 'Error - MaxEstudiantes no debe ser superior a 30');
        }
    })

    this.after('READ','Estudiantes', function(data){
        const alumnos = Array.isArray(data) ? data : [data];
        alumnos.forEach((alumno) => {
            switch (alumno.Status){
                case 'A': //activo
                    alumno.Critico = 3;
                    break;
                case 'I': //inactivo
                    alumno.Critico = 2;
                    break;
                case 'P': //pendiente
                    alumno.Critico = 1;
                    break;    
                default:
                    break;    
            }
        })
    })

    this.on('notificaAlumno', async function(req){
        console.log("Alumno notificado");
        let id;
        let Alumno;
        let query;
        let Nombre;
        let status;
        let curso_ID;
        let Cursos;
        let nombre_curso;
        const params = req.params;

        if(params != null){
            let adms = await cds.connect.to('AdminService');  //connected via Odata

            for(let i = 0; i < params.length; i++){
                if(params[i].ID != null){
                    id = params[i].ID;
                    console.log('ID: '+id);
                    query = SELECT `ID,Nombre,FechaNac,curso,Status` .from `Estudiantes` .where `ID = ${id}`; 
                    Alumno = await adms.run(query);
                    if(Alumno){
                        Nombre = Alumno[0].Nombre;
                        curso_ID = Alumno[0].curso_ID;
                        status = Alumno[0].status;
                    }
                    console.log('Nombre '+Nombre);

                    query = SELECT `ID,Nombre` .from `Cursos` .where `ID = ${curso_ID}`;
                    Cursos = await adms.run(query);
                    if(Cursos){
                        nombre_curso = Cursos[0].Nombre;
                    }
                    console.log('Nombre curso '+nombre_curso);
                }
            }
        }
        req.info(200, 'Alumno '+Nombre+' cursando '+nombre_curso);
    })

    this.on('inactivaAlumno', async function(req){
        console.log('Inactiva alumno');
        const {Estudiantes} = this.entities;
        const params = req.params;
        if(params != null){
            for(let i=0;i<params.length;i++){
                if(params[i].ID != null){
                    await UPDATE.entity(Estudiantes, params[i].ID).set({Status:'I', Comentario: req.data.text});
                    console.log('ID: '+params[i].ID+' - Status: '+params[i].Status);
                    req.info(400,'Alumno actualizado exitosamente');
                }
                
            }
        }
        req.reply();
    })
})