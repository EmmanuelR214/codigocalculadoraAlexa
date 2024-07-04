const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const DOCUMENT_ID = "BienvenidaAPL";
const DOCUMENT_ID2 = "ComidaAPL";
const DOCUMENT_ID3 = "LugaresAPL";
const DOCUMENT_ID4 = "TrajeAPL";
const DOCUMENT_ID5 = "PersonajeAPL";
const DOCUMENT_ID_Des = "DescripcionAPL";
const DOCUMENT_ID_Music = "MusicaAPL";

const languageStrings = {
    en: {
        translation: {
            WELCOME_MSG: 'Hello! To learn about Pachuca, you can say: Describe Pachuca. Tell me about tourist places in Pachuca. Tell me about typical food of Pachuca. Tell me about the traditional costume of Pachuca. Tell me about notable people from Pachuca. Tell me about the music of Pachuca.',
            HELP_MSG: 'You can say hello to me! How can I help?',
            GOODBYE_MSG: 'Goodbye!',
            FALLBACK_MSG: 'Sorry, I don\'t know about that. Please try again.',
            ERROR_MSG: 'Sorry, I had trouble doing what you asked. Please try again.',
            DESCRIPTION_MSG: 'Known as "La Bella Airosa", Pachuca de Soto is the capital of Hidalgo and is famous for its monumental clock, wooded landscapes, and rich pastes.',
            PLACES_MSG: 'Some tourist places to visit are: The Interactive Soccer World Center. The David Ben Gurion Park. El Rehilete Museum. Acosta Mine Site Museum.',
            FOOD_MSG: 'Typical cuisine of Pachuca includes a wide variety, such as: miner\'s chicken tacos with cheese, buttered chinicuiles, bean gorditas, etc.',
            COSTUME_MSG: 'The typical costume is that of the Huasteca region.',
            PEOPLE_MSG: 'Over time, there have been notable figures in the city of Pachuca, such as: Margarita Michelena, Bertha Zerón Nava, Juan Guillermo Villasana, Alfonso Cravioto Mejorada, Jesús Becerril Martínez, María Luisa Ross Landa.',
            MUSIC_MSG: 'Playing music from Pachuca de Soto Hidalgo.'
        }
    },
    es: {
        translation: {
            WELCOME_MSG: '¡Hola! Para saber sobre Pachuca puedes decir: Describe Pachuca. Dime los lugares turísticos de Pachuca. Dime la comida típica de Pachuca. Dime el traje típico de Pachuca. Dime los personajes sobresalientes de Pachuca. Dime la música de Pachuca.',
            HELP_MSG: '¡Puedes decir hola! ¿Cómo puedo ayudarte?',
            GOODBYE_MSG: '¡Adiós!',
            FALLBACK_MSG: 'Lo siento, no sé sobre eso. Por favor, intenta nuevamente.',
            ERROR_MSG: 'Lo siento, tuve problemas para realizar lo que pediste. Por favor, intenta de nuevo.',
            DESCRIPTION_MSG: 'Conocida como "La Bella Airosa", Pachuca de Soto es la capital de Hidalgo y es famosa por su reloj monumental, paisajes boscosos y ricos pastes.',
            PLACES_MSG: 'Algunos lugares turísticos para visitar son: El centro interactivo Mundo Fútbol. El parque David Ben Gurión. El museo El Rehilete. El museo de sitio mina de Acosta.',
            FOOD_MSG: 'La cocina típica de Pachuca tiene una amplia variedad, como por ejemplo: tacos mineros de pollo con queso, chinicuiles a la mantequilla, gorditas de frijol, etc.',
            COSTUME_MSG: 'El traje típico es el de la región Huasteca.',
            PEOPLE_MSG: 'A lo largo del tiempo ha habido personajes ilustres en la ciudad de Pachuca, tales como: Margarita Michelena, Bertha Zerón Nava, Juan Guillermo Villasana, Alfonso Cravioto Mejorada, Jesús Becerril Martínez, María Luisa Ross Landa.',
            MUSIC_MSG: 'Reproduciendo música de Pachuca de Soto Hidalgo.'
        }
    }
};



const datasource = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://www.rm-auditores.com.mx/imagenes/sucursal_hidalgo.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "¡Hola! Para saber sobre Pachuca puedes decir: Describe Pachuca. Dime los lugares turisticos de Pachuca. Dime la comida tipica de Pachuca. Dime el traje tipico de Pachuca. Dime los personajes sobresaliente de Pachuca. Dime la musica de Pachuca."
                }
            },
            "logoUrl": "",
            "hintText": ""
        }
    }
};
const datasource2 = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://tb-static.uber.com/prod/image-proc/processed_images/208a16296282b7cbfd488c5178f941df/6a46de29c91d235bc2878fe87fd740f6.jpeg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "La cocina típica de Pachuca tiene una amplia variedad, como por ejemplo: tacos mineros de pollo con queso, unos chinicuiles a la mantequilla, gorditas de frijol, etc"
                }
            },
            "logoUrl": "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v3/logo/logo-modern-botanical-white.png",
            "hintText": ""
        }
    }
};


const datasource3 = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://www.mexicodesconocido.com.mx/wp-content/uploads/2019/11/FIN_PRISMAS_HUASCA.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Algunos lugares turisticos para visitar, serian: El centro Interactivo Mundo Futbol. El parque David Ben Gurión. Museo El Rehilete. Museo de sitio mina de acosta."
                }
            },
            "logoUrl": "",
            "hintText": ""
        }
    }
};


const datasource4 = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://static.wixstatic.com/media/8ea67d_29956172e3c34b5c9c114a9976a4277d~mv2_d_2200_1439_s_2.jpg/v1/fit/w_500,h_500,q_90/file.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "El traje tipico de es el de la Huasteca."
                }
            },
            "logoUrl": "",
            "hintText": ""
        }
    }
};


const datasource5 = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://a.travel-assets.com/findyours-php/viewfinder/images/res60/225000/225740-Monumental-Clock-Of-Pachuca.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "A lo largo del tiempo ha habido personajes ilustres en la ciudad de Pachuca, tales como: Margarita Michelena, Bertha Zerón Nava, Juan Guillermo Villasana, Alfonso Cravioto Mejorada, Jesús Becerril Martínez, María Luisa Ross Landa."
                }
            },
            "logoUrl": "",
            "hintText": ""
        }
    }
};


const datasourceDes = {
    "videoPlayerTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://img.freepik.com/foto-gratis/fondo-pantalla-patron-fondo-abstracto-grunge-negro-foto-gratis_1340-33839.jpg",
            "displayFullscreen": false,
            "headerTitle": "",
            "headerSubtitle": "",
            "logoUrl": "",
            "videoControlType": "skip",
            "videoSources": [
                "https://labarbada.store/videos/ciudadPachuca.mp4"
            ],
            "sliderType": "determinate"
        }
    }
};


const datasourceMusic = {
    "audioPlayerTemplateData": {
        "type": "object",
        "properties": {
            "audioControlType": "jump30",
            "audioSources": [
                "https://labarbada.store/videos/guapango.m4a"
            ],
            "backgroundImage": "https://static.vecteezy.com/system/resources/thumbnails/002/175/922/small/realistic-black-wall-texture-abstract-background-vector.jpg",
            "coverImageSource": "https://static.wixstatic.com/media/8ea67d_29956172e3c34b5c9c114a9976a4277d~mv2_d_2200_1439_s_2.jpg/v1/fit/w_500,h_500,q_90/file.jpg",
            "headerTitle": "Musica tradicional",
            "logoUrl": "",
            "primaryText": "Huapango",
            "secondaryText": "Mi PlayList",
            "sliderType": "determinate"
        }
    }
};


const createDirectivePayload = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MSG');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID, datasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Lo siento, tuve problemas para realizar lo que pediste. Por favor, intenta de nuevo.';
        console.log(`~~~~ Error handled: ${error.message}`);
        console.log(`~~~~ Error stack: ${error.stack}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const DescripcionHandle = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DescripcionIntent';
    },
    handle(handlerInput) {
        const speakOutput = "Conocida como 'la Bella Airosa', Pachuca de Soto es la capital de Hidalgo y es famosa por su reloj monumental, paisajes boscosos y ricos pastes.";

        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_Des, datasourceDes);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const LugaresHandle = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LugaresIntent';
    },
    handle(handlerInput) {
        const speakOutput = "Algunos lugares turisticos para visitar, serian: El centro Interactivo Mundo Futbol. El parque David Ben Gurión. Museo El Rehilete. Museo de sitio mina de acosta.";
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID3, datasource3);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ComidaHandle = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ComidaIntent';
    },
    handle(handlerInput) {
        const speakOutput = "La cocina típica de Pachuca tiene una amplia variedad, como por ejemplo: tacos mineros de pollo con queso, unos chinicuiles a la mantequilla, gorditas de frijol, etc.";
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID2, datasource2);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const TrajeHandle = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TrajeIntent';
    },
    handle(handlerInput) {
        const speakOutput = "El traje tipico de es el de la Huasteca.";
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID4, datasource4);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const PersonajesHandle = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PersonajesIntent';
    },
    handle(handlerInput) {
        const speakOutput = "A lo largo del tiempo ha habido personajes ilustres en la ciudad de Pachuca, tales como: Margarita Michelena, Bertha Zerón Nava, Juan Guillermo Villasana, Alfonso Cravioto Mejorada, Jesús Becerril Martínez, María Luisa Ross Landa.";
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID5, datasource5);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const MusicaHandle = {
    canHandle(handlerInput) {
        console.log('Checking if can handle MusicaIntent');
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MusicaIntent';
    },
    handle(handlerInput) {
        const speakOutput = "Reproduciendo música de Pachuca de Soto Hidalgo.";
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_Music, datasourceMusic);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const AudioPlayerEventHandler = {
    canHandle(handlerInput) {
        const requestType = Alexa.getRequestType(handlerInput.requestEnvelope);
        return requestType.startsWith('AudioPlayer.');
    },
    handle(handlerInput) {
        // Maneja los eventos de AudioPlayer aquí si es necesario
        return handlerInput.responseBuilder.getResponse();
    }
};


// Localization interceptor
// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        DescripcionHandle,
        LugaresHandle,
        ComidaHandle,
        TrajeHandle,
        PersonajesHandle,
        MusicaHandle,
        AudioPlayerEventHandler,
        IntentReflectorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();