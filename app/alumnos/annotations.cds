using AdminService as service from '../../srv/service';
annotate service.Estudiantes with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Nombre',
                Value : Nombre,
            },
            {
                $Type : 'UI.DataField',
                Label : 'FechaNac',
                Value : FechaNac,
            },
            {
                $Type : 'UI.DataField',
                Value : Email,
                Label : 'Email',
            },
            {
                $Type : 'UI.DataField',
                Value : Telefono,
                Label : 'Telefono',
            },
            {
                $Type : 'UI.DataField',
                Value : Status,
                Label : 'Status',
                Criticality : Critico,
            },
            {
                $Type : 'UI.DataField',
                Value : Critico,
                Label : 'Critico',
            },
            {
                $Type : 'UI.DataField',
                Value : Comentario,
                Label : 'Comentario',
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'Detalle Alumno',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Nombre',
            Value : Nombre,
        },
        {
            $Type : 'UI.DataField',
            Label : 'FechaNac',
            Value : FechaNac,
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'AdminService.notificaAlumno',
            Label : 'Notificar Alumno',
        },
    ],
    UI.Identification : [
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'AdminService.inactivaAlumno',
            Label : 'Inactivar Alumno',
            ![@UI.Hidden] : {$edmJson: {$If: [
                {$Eq: [
                    {$Path: 'IsActiveEntity'},
                    false
                ]},
                true,
                false
            ]}},
        },
    ],
);

annotate service.Estudiantes with {
    curso @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Cursos',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : curso_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'Nombre',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'MaxEstudiantes',
            },
        ],
    }
};

annotate service.Estudiantes with {
    Critico @Common.FieldControl : #ReadOnly
};

annotate service.Estudiantes with {
    Comentario @Common.FieldControl : #ReadOnly
};

