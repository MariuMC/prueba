sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'alumno/alumnos/test/integration/FirstJourney',
		'alumno/alumnos/test/integration/pages/EstudiantesList',
		'alumno/alumnos/test/integration/pages/EstudiantesObjectPage'
    ],
    function(JourneyRunner, opaJourney, EstudiantesList, EstudiantesObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('alumno/alumnos') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEstudiantesList: EstudiantesList,
					onTheEstudiantesObjectPage: EstudiantesObjectPage
                }
            },
            opaJourney.run
        );
    }
);