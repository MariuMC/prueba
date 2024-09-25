sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'estudiantes/estudiantes/test/integration/FirstJourney',
		'estudiantes/estudiantes/test/integration/pages/EstudiantesByCursoList',
		'estudiantes/estudiantes/test/integration/pages/EstudiantesByCursoObjectPage'
    ],
    function(JourneyRunner, opaJourney, EstudiantesByCursoList, EstudiantesByCursoObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('estudiantes/estudiantes') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEstudiantesByCursoList: EstudiantesByCursoList,
					onTheEstudiantesByCursoObjectPage: EstudiantesByCursoObjectPage
                }
            },
            opaJourney.run
        );
    }
);