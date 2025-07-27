interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Header
    appTitle: "Smart Weather + Outfit Recommender",
    
    // City Input
    enterCity: "Enter city name...",
    getWeather: "Get Weather",
    useLocation: "Use my location",
    
    // Weather Display
    humidity: "Humidity",
    wind: "Wind",
    visibility: "Visibility",
    
    // Outfit Recommendation
    outfitRecommendation: "Outfit Recommendation",
    manageWardrobe: "Manage MyWardrobe",
    generalSuggestion: "General Suggestion",
    fromWardrobe: "From Your Wardrobe",
    speakRecommendation: "Speak Recommendation",
    stopSpeaking: "Stop Speaking",
    noSuitableItems: "No suitable items found in your wardrobe for this weather. Consider adding more items or check the weather suitability settings.",
    
    // Activity Suggestions
    suggestedActivities: "Suggested Activities",
    activitiesTip: "Activities are personalized based on current weather conditions in",
    
    // Weather Forecast
    dayForecast: "5-Day Forecast",
    general: "General",
    myWardrobe: "MyWardrobe",
    noSuitableWardrobe: "No suitable wardrobe items for this day",
    
    // Footer
    poweredBy: "Powered by",
    builtBy: "Built by Your Name",
    
    // Preferences
    preferences: "Preferences",
    clothingStyle: "Clothing Style",
    theme: "Theme",
    language: "Language",
    myWardrobe: "My Wardrobe",
    wardrobeDescription: "Add your clothing items to get personalized outfit suggestions",
    cancel: "Cancel",
    save: "Save",
    
    // Wardrobe Manager
    manageMyWardrobe: "Manage MyWardrobe",
    addNewItem: "Add New Item",
    editItem: "Edit Item",
    itemName: "Item Name",
    itemNamePlaceholder: "e.g., Blue Denim Jacket",
    type: "Type",
    selectType: "Select type",
    color: "Color",
    colorPlaceholder: "e.g., Blue, Red, Black",
    category: "Category",
    selectCategory: "Select category",
    weatherSuitability: "Weather Suitability (Optional)",
    anyWeather: "Any weather",
    updateItem: "Update Item",
    addItem: "Add Item",
    yourWardrobe: "Your Wardrobe",
    items: "items",
    noItemsYet: "No items in your wardrobe yet.",
    addItemsDescription: "Add some items to get personalized outfit suggestions!",
    
    // Weather Alerts
    highWindWarning: "High Wind Warning",
    windWarningDesc: "Strong winds expected with speeds up to",
    secureObjects: "Secure loose objects.",
    heatAdvisory: "Heat Advisory",
    heatAdvisoryDesc: "Extremely high temperatures. Stay hydrated and avoid prolonged sun exposure.",
    coldWeatherWarning: "Cold Weather Warning",
    coldWarningDesc: "Extremely cold temperatures. Dress warmly and limit outdoor exposure.",
    
    // Offline
    offlineMessage: "You're offline. Showing cached data.",
    
    // Errors
    cityNotFound: "City not found. Please check the spelling and try again.",
    invalidApiKey: "Invalid API key. Please check your configuration.",
    weatherServiceError: "Weather service error",
    failedToFetch: "Failed to fetch weather data. Please try again.",
    locationDenied: "Location access denied. Please enable location permissions.",
    locationUnavailable: "Location information is unavailable.",
    locationTimeout: "Location request timed out.",
    unableToRetrieve: "Unable to retrieve your location.",
    apiNotConfigured: "API key not configured. Please check your environment variables."
  },
  es: {
    // Header
    appTitle: "Recomendador Inteligente de Clima + Vestimenta",
    
    // City Input
    enterCity: "Ingresa el nombre de la ciudad...",
    getWeather: "Obtener Clima",
    useLocation: "Usar mi ubicación",
    
    // Weather Display
    humidity: "Humedad",
    wind: "Viento",
    visibility: "Visibilidad",
    
    // Outfit Recommendation
    outfitRecommendation: "Recomendación de Vestimenta",
    manageWardrobe: "Gestionar Mi Guardarropa",
    generalSuggestion: "Sugerencia General",
    fromWardrobe: "De Tu Guardarropa",
    speakRecommendation: "Leer Recomendación",
    stopSpeaking: "Detener Lectura",
    noSuitableItems: "No se encontraron artículos adecuados en tu guardarropa para este clima. Considera agregar más artículos o verificar la configuración de idoneidad climática.",
    
    // Activity Suggestions
    suggestedActivities: "Actividades Sugeridas",
    activitiesTip: "Las actividades están personalizadas según las condiciones climáticas actuales en",
    
    // Weather Forecast
    dayForecast: "Pronóstico de 5 Días",
    general: "General",
    myWardrobe: "Mi Guardarropa",
    noSuitableWardrobe: "No hay artículos de guardarropa adecuados para este día",
    
    // Footer
    poweredBy: "Desarrollado por",
    builtBy: "Creado por Tu Nombre",
    
    // Preferences
    preferences: "Preferencias",
    clothingStyle: "Estilo de Ropa",
    theme: "Tema",
    language: "Idioma",
    myWardrobe: "Mi Guardarropa",
    wardrobeDescription: "Agrega tus prendas de vestir para obtener sugerencias personalizadas",
    cancel: "Cancelar",
    save: "Guardar",
    
    // Wardrobe Manager
    manageMyWardrobe: "Gestionar Mi Guardarropa",
    addNewItem: "Agregar Nuevo Artículo",
    editItem: "Editar Artículo",
    itemName: "Nombre del Artículo",
    itemNamePlaceholder: "ej., Chaqueta de Mezclilla Azul",
    type: "Tipo",
    selectType: "Seleccionar tipo",
    color: "Color",
    colorPlaceholder: "ej., Azul, Rojo, Negro",
    category: "Categoría",
    selectCategory: "Seleccionar categoría",
    weatherSuitability: "Idoneidad Climática (Opcional)",
    anyWeather: "Cualquier clima",
    updateItem: "Actualizar Artículo",
    addItem: "Agregar Artículo",
    yourWardrobe: "Tu Guardarropa",
    items: "artículos",
    noItemsYet: "Aún no tienes artículos en tu guardarropa.",
    addItemsDescription: "¡Agrega algunos artículos para obtener sugerencias personalizadas!",
    
    // Weather Alerts
    highWindWarning: "Advertencia de Viento Fuerte",
    windWarningDesc: "Se esperan vientos fuertes con velocidades de hasta",
    secureObjects: "Asegura objetos sueltos.",
    heatAdvisory: "Aviso de Calor",
    heatAdvisoryDesc: "Temperaturas extremadamente altas. Mantente hidratado y evita la exposición prolongada al sol.",
    coldWeatherWarning: "Advertencia de Clima Frío",
    coldWarningDesc: "Temperaturas extremadamente frías. Vístete abrigado y limita la exposición al exterior.",
    
    // Offline
    offlineMessage: "Estás desconectado. Mostrando datos en caché.",
    
    // Errors
    cityNotFound: "Ciudad no encontrada. Por favor verifica la ortografía e intenta de nuevo.",
    invalidApiKey: "Clave API inválida. Por favor verifica tu configuración.",
    weatherServiceError: "Error del servicio meteorológico",
    failedToFetch: "Error al obtener datos meteorológicos. Por favor intenta de nuevo.",
    locationDenied: "Acceso a ubicación denegado. Por favor habilita los permisos de ubicación.",
    locationUnavailable: "Información de ubicación no disponible.",
    locationTimeout: "Tiempo de espera de solicitud de ubicación agotado.",
    unableToRetrieve: "No se puede obtener tu ubicación.",
    apiNotConfigured: "Clave API no configurada. Por favor verifica tus variables de entorno."
  },
  fr: {
    // Header
    appTitle: "Recommandateur Intelligent Météo + Tenue",
    
    // City Input
    enterCity: "Entrez le nom de la ville...",
    getWeather: "Obtenir la Météo",
    useLocation: "Utiliser ma position",
    
    // Weather Display
    humidity: "Humidité",
    wind: "Vent",
    visibility: "Visibilité",
    
    // Outfit Recommendation
    outfitRecommendation: "Recommandation de Tenue",
    manageWardrobe: "Gérer Ma Garde-robe",
    generalSuggestion: "Suggestion Générale",
    fromWardrobe: "De Votre Garde-robe",
    speakRecommendation: "Lire la Recommandation",
    stopSpeaking: "Arrêter la Lecture",
    noSuitableItems: "Aucun article approprié trouvé dans votre garde-robe pour ce temps. Considérez ajouter plus d'articles ou vérifiez les paramètres d'adéquation météorologique.",
    
    // Activity Suggestions
    suggestedActivities: "Activités Suggérées",
    activitiesTip: "Les activités sont personnalisées selon les conditions météorologiques actuelles à",
    
    // Weather Forecast
    dayForecast: "Prévisions 5 Jours",
    general: "Général",
    myWardrobe: "Ma Garde-robe",
    noSuitableWardrobe: "Aucun article de garde-robe approprié pour ce jour",
    
    // Footer
    poweredBy: "Alimenté par",
    builtBy: "Créé par Votre Nom",
    
    // Preferences
    preferences: "Préférences",
    clothingStyle: "Style Vestimentaire",
    theme: "Thème",
    language: "Langue",
    myWardrobe: "Ma Garde-robe",
    wardrobeDescription: "Ajoutez vos vêtements pour obtenir des suggestions personnalisées",
    cancel: "Annuler",
    save: "Sauvegarder",
    
    // Wardrobe Manager
    manageMyWardrobe: "Gérer Ma Garde-robe",
    addNewItem: "Ajouter Nouvel Article",
    editItem: "Modifier l'Article",
    itemName: "Nom de l'Article",
    itemNamePlaceholder: "ex., Veste en Jean Bleue",
    type: "Type",
    selectType: "Sélectionner le type",
    color: "Couleur",
    colorPlaceholder: "ex., Bleu, Rouge, Noir",
    category: "Catégorie",
    selectCategory: "Sélectionner la catégorie",
    weatherSuitability: "Adéquation Météorologique (Optionnel)",
    anyWeather: "Tout temps",
    updateItem: "Mettre à Jour l'Article",
    addItem: "Ajouter l'Article",
    yourWardrobe: "Votre Garde-robe",
    items: "articles",
    noItemsYet: "Aucun article dans votre garde-robe pour le moment.",
    addItemsDescription: "Ajoutez quelques articles pour obtenir des suggestions personnalisées !",
    
    // Weather Alerts
    highWindWarning: "Avertissement de Vent Fort",
    windWarningDesc: "Vents forts attendus avec des vitesses allant jusqu'à",
    secureObjects: "Sécurisez les objets non fixés.",
    heatAdvisory: "Avis de Chaleur",
    heatAdvisoryDesc: "Températures extrêmement élevées. Restez hydraté et évitez l'exposition prolongée au soleil.",
    coldWeatherWarning: "Avertissement de Temps Froid",
    coldWarningDesc: "Températures extrêmement froides. Habillez-vous chaudement et limitez l'exposition extérieure.",
    
    // Offline
    offlineMessage: "Vous êtes hors ligne. Affichage des données en cache.",
    
    // Errors
    cityNotFound: "Ville non trouvée. Veuillez vérifier l'orthographe et réessayer.",
    invalidApiKey: "Clé API invalide. Veuillez vérifier votre configuration.",
    weatherServiceError: "Erreur du service météorologique",
    failedToFetch: "Échec de récupération des données météorologiques. Veuillez réessayer.",
    locationDenied: "Accès à la localisation refusé. Veuillez activer les permissions de localisation.",
    locationUnavailable: "Informations de localisation non disponibles.",
    locationTimeout: "Délai d'attente de la demande de localisation dépassé.",
    unableToRetrieve: "Impossible de récupérer votre localisation.",
    apiNotConfigured: "Clé API non configurée. Veuillez vérifier vos variables d'environnement."
  },
  de: {
    // Header
    appTitle: "Intelligenter Wetter + Outfit Empfehler",
    
    // City Input
    enterCity: "Stadtname eingeben...",
    getWeather: "Wetter Abrufen",
    useLocation: "Meinen Standort verwenden",
    
    // Weather Display
    humidity: "Luftfeuchtigkeit",
    wind: "Wind",
    visibility: "Sichtweite",
    
    // Outfit Recommendation
    outfitRecommendation: "Outfit-Empfehlung",
    manageWardrobe: "Meine Garderobe Verwalten",
    generalSuggestion: "Allgemeine Empfehlung",
    fromWardrobe: "Aus Ihrer Garderobe",
    speakRecommendation: "Empfehlung Vorlesen",
    stopSpeaking: "Vorlesen Stoppen",
    noSuitableItems: "Keine geeigneten Artikel in Ihrer Garderobe für dieses Wetter gefunden. Erwägen Sie, mehr Artikel hinzuzufügen oder überprüfen Sie die Wettereignungseinstellungen.",
    
    // Activity Suggestions
    suggestedActivities: "Vorgeschlagene Aktivitäten",
    activitiesTip: "Aktivitäten sind personalisiert basierend auf aktuellen Wetterbedingungen in",
    
    // Weather Forecast
    dayForecast: "5-Tage-Vorhersage",
    general: "Allgemein",
    myWardrobe: "Meine Garderobe",
    noSuitableWardrobe: "Keine geeigneten Garderobe-Artikel für diesen Tag",
    
    // Footer
    poweredBy: "Unterstützt von",
    builtBy: "Erstellt von Ihr Name",
    
    // Preferences
    preferences: "Einstellungen",
    clothingStyle: "Kleidungsstil",
    theme: "Design",
    language: "Sprache",
    myWardrobe: "Meine Garderobe",
    wardrobeDescription: "Fügen Sie Ihre Kleidungsstücke hinzu, um personalisierte Empfehlungen zu erhalten",
    cancel: "Abbrechen",
    save: "Speichern",
    
    // Wardrobe Manager
    manageMyWardrobe: "Meine Garderobe Verwalten",
    addNewItem: "Neuen Artikel Hinzufügen",
    editItem: "Artikel Bearbeiten",
    itemName: "Artikelname",
    itemNamePlaceholder: "z.B., Blaue Jeansjacke",
    type: "Typ",
    selectType: "Typ auswählen",
    color: "Farbe",
    colorPlaceholder: "z.B., Blau, Rot, Schwarz",
    category: "Kategorie",
    selectCategory: "Kategorie auswählen",
    weatherSuitability: "Wettereignung (Optional)",
    anyWeather: "Jedes Wetter",
    updateItem: "Artikel Aktualisieren",
    addItem: "Artikel Hinzufügen",
    yourWardrobe: "Ihre Garderobe",
    items: "Artikel",
    noItemsYet: "Noch keine Artikel in Ihrer Garderobe.",
    addItemsDescription: "Fügen Sie einige Artikel hinzu, um personalisierte Empfehlungen zu erhalten!",
    
    // Weather Alerts
    highWindWarning: "Starkwind-Warnung",
    windWarningDesc: "Starke Winde erwartet mit Geschwindigkeiten bis zu",
    secureObjects: "Sichern Sie lose Gegenstände.",
    heatAdvisory: "Hitze-Warnung",
    heatAdvisoryDesc: "Extrem hohe Temperaturen. Bleiben Sie hydratisiert und vermeiden Sie längere Sonnenexposition.",
    coldWeatherWarning: "Kältewetter-Warnung",
    coldWarningDesc: "Extrem kalte Temperaturen. Ziehen Sie sich warm an und begrenzen Sie die Exposition im Freien.",
    
    // Offline
    offlineMessage: "Sie sind offline. Zeige zwischengespeicherte Daten.",
    
    // Errors
    cityNotFound: "Stadt nicht gefunden. Bitte überprüfen Sie die Schreibweise und versuchen Sie es erneut.",
    invalidApiKey: "Ungültiger API-Schlüssel. Bitte überprüfen Sie Ihre Konfiguration.",
    weatherServiceError: "Wetterdienst-Fehler",
    failedToFetch: "Fehler beim Abrufen der Wetterdaten. Bitte versuchen Sie es erneut.",
    locationDenied: "Standortzugriff verweigert. Bitte aktivieren Sie die Standortberechtigungen.",
    locationUnavailable: "Standortinformationen nicht verfügbar.",
    locationTimeout: "Standortanfrage-Timeout.",
    unableToRetrieve: "Ihr Standort kann nicht abgerufen werden.",
    apiNotConfigured: "API-Schlüssel nicht konfiguriert. Bitte überprüfen Sie Ihre Umgebungsvariablen."
  },
  it: {
    // Header
    appTitle: "Raccomandatore Intelligente Meteo + Outfit",
    
    // City Input
    enterCity: "Inserisci il nome della città...",
    getWeather: "Ottieni Meteo",
    useLocation: "Usa la mia posizione",
    
    // Weather Display
    humidity: "Umidità",
    wind: "Vento",
    visibility: "Visibilità",
    
    // Outfit Recommendation
    outfitRecommendation: "Raccomandazione Outfit",
    manageWardrobe: "Gestisci Il Mio Guardaroba",
    generalSuggestion: "Suggerimento Generale",
    fromWardrobe: "Dal Tuo Guardaroba",
    speakRecommendation: "Leggi Raccomandazione",
    stopSpeaking: "Ferma Lettura",
    noSuitableItems: "Nessun articolo adatto trovato nel tuo guardaroba per questo tempo. Considera di aggiungere più articoli o controlla le impostazioni di idoneità meteorologica.",
    
    // Activity Suggestions
    suggestedActivities: "Attività Suggerite",
    activitiesTip: "Le attività sono personalizzate in base alle condizioni meteorologiche attuali a",
    
    // Weather Forecast
    dayForecast: "Previsioni 5 Giorni",
    general: "Generale",
    myWardrobe: "Il Mio Guardaroba",
    noSuitableWardrobe: "Nessun articolo di guardaroba adatto per questo giorno",
    
    // Footer
    poweredBy: "Alimentato da",
    builtBy: "Creato da Il Tuo Nome",
    
    // Preferences
    preferences: "Preferenze",
    clothingStyle: "Stile di Abbigliamento",
    theme: "Tema",
    language: "Lingua",
    myWardrobe: "Il Mio Guardaroba",
    wardrobeDescription: "Aggiungi i tuoi capi di abbigliamento per ottenere suggerimenti personalizzati",
    cancel: "Annulla",
    save: "Salva",
    
    // Wardrobe Manager
    manageMyWardrobe: "Gestisci Il Mio Guardaroba",
    addNewItem: "Aggiungi Nuovo Articolo",
    editItem: "Modifica Articolo",
    itemName: "Nome Articolo",
    itemNamePlaceholder: "es., Giacca di Jeans Blu",
    type: "Tipo",
    selectType: "Seleziona tipo",
    color: "Colore",
    colorPlaceholder: "es., Blu, Rosso, Nero",
    category: "Categoria",
    selectCategory: "Seleziona categoria",
    weatherSuitability: "Idoneità Meteorologica (Opzionale)",
    anyWeather: "Qualsiasi tempo",
    updateItem: "Aggiorna Articolo",
    addItem: "Aggiungi Articolo",
    yourWardrobe: "Il Tuo Guardaroba",
    items: "articoli",
    noItemsYet: "Nessun articolo nel tuo guardaroba ancora.",
    addItemsDescription: "Aggiungi alcuni articoli per ottenere suggerimenti personalizzati!",
    
    // Weather Alerts
    highWindWarning: "Avviso Vento Forte",
    windWarningDesc: "Venti forti previsti con velocità fino a",
    secureObjects: "Fissa oggetti non ancorati.",
    heatAdvisory: "Avviso Calore",
    heatAdvisoryDesc: "Temperature estremamente elevate. Rimani idratato ed evita l'esposizione prolungata al sole.",
    coldWeatherWarning: "Avviso Tempo Freddo",
    coldWarningDesc: "Temperature estremamente fredde. Vestiti calorosamente e limita l'esposizione esterna.",
    
    // Offline
    offlineMessage: "Sei offline. Mostrando dati memorizzati.",
    
    // Errors
    cityNotFound: "Città non trovata. Controlla l'ortografia e riprova.",
    invalidApiKey: "Chiave API non valida. Controlla la tua configurazione.",
    weatherServiceError: "Errore servizio meteorologico",
    failedToFetch: "Impossibile recuperare i dati meteorologici. Riprova.",
    locationDenied: "Accesso alla posizione negato. Abilita i permessi di localizzazione.",
    locationUnavailable: "Informazioni sulla posizione non disponibili.",
    locationTimeout: "Timeout richiesta posizione.",
    unableToRetrieve: "Impossibile recuperare la tua posizione.",
    apiNotConfigured: "Chiave API non configurata. Controlla le tue variabili d'ambiente."
  }
};

export const useTranslation = () => {
  const getStoredLanguage = (): string => {
    try {
      const preferences = localStorage.getItem('userPreferences');
      if (preferences) {
        const parsed = JSON.parse(preferences);
        return parsed.language || 'en';
      }
    } catch (error) {
      console.error('Error getting stored language:', error);
    }
    return 'en';
  };

  const currentLanguage = getStoredLanguage();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if no translation found
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return { t, currentLanguage };
};