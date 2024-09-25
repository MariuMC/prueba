sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'curso/cursos/test/integration/FirstJourney',
		'curso/cursos/test/integration/pages/CursosList',
		'curso/cursos/test/integration/pages/CursosObjectPage'
    ],
    function(JourneyRunner, opaJourney, CursosList, CursosObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('curso/cursos') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheCursosList: CursosList,
					onTheCursosObjectPage: CursosObjectPage
                }
            },
            opaJourney.run
        );
    }
);