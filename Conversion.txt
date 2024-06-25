const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
    'en': {
        translation: {
            WELCOME: 'Hello welcome! What do you want to convert? You can say Hello or Help.',
            HELP: 'You can ask me to convert temperatures. How can I help?',
            GOODBYE: 'Goodbye Many!',
            FALLBACK: 'Sorry, I don\'t know about that. Please try again.',
            ERROR: 'Sorry, I had trouble doing what you asked. Please try again.',
            CENTIGRADOS_RESULT: '{{cent}} degrees Celsius is {{result}} degrees Fahrenheit.',
            FARENHEIT_RESULT: '{{far}} degrees Fahrenheit is {{result}} degrees Celsius.',
            FUNCTION_AVAILABLE_IN_SPANISH: 'This function is only available in Spanish.',
            FUNCTION_AVAILABLE_IN_ENGLISH: 'Esta función solo está disponible en inglés.'
        }
    },
    'es': {
        translation: {
            WELCOME: '¡Hola Bienvenidos! ¿Que deseas convertir?, puedes decir Hola o Ayuda.',
            HELP: 'Puedes pedirme que convierta temperaturas. ¿Cómo te puedo ayudar?',
            GOODBYE: '¡Adiós Many!',
            FALLBACK: 'Lo siento, no sé sobre eso. Por favor intenta de nuevo.',
            ERROR: 'Lo siento, tuve problemas para hacer lo que pediste. Por favor intenta de nuevo.',
            CENTIGRADOS_RESULT: '{{cent}} grados centígrados son {{result}} grados Fahrenheit.',
            FARENHEIT_RESULT: '{{far}} grados Fahrenheit son {{result}} grados centígrados.',
            FUNCTION_AVAILABLE_IN_SPANISH: 'Esta función solo está disponible en español Many :(.',
            FUNCTION_AVAILABLE_IN_ENGLISH: 'This function is only available in English Many:(.'
        }
    }
};

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            resources: languageStrings,
            returnObjects: true
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        };
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CentigradosIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CentigradosIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const locale = handlerInput.requestEnvelope.request.locale;
        
        if (locale.startsWith('en')) {
            const cent = handlerInput.requestEnvelope.request.intent.slots.cent.value;
            const result = (cent * 9/5) + 32;
            const speakOutput = requestAttributes.t('CENTIGRADOS_RESULT', { cent, result });
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } else {
            const speakOutput = requestAttributes.t('FUNCTION_AVAILABLE_IN_ENGLISH');
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    }
};

const FarenheitIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FarenheitIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const locale = handlerInput.requestEnvelope.request.locale;
        
        if (locale.startsWith('es')) {
            const far = handlerInput.requestEnvelope.request.intent.slots.far.value;
            const result = (far - 32) * 5/9;
            const speakOutput = requestAttributes.t('FARENHEIT_RESULT', { far, result });
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } else {
            const speakOutput = requestAttributes.t('FUNCTION_AVAILABLE_IN_SPANISH');
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP');

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
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE');

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
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK');

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
        return handlerInput.responseBuilder.getResponse();
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
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CentigradosIntentHandler,
        FarenheitIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('sample/temperature-converter/v1.0')
    .lambda();