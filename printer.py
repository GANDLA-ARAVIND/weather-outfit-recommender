def save_files_data(file_paths, output_file):
    with open(output_file, 'w', encoding='utf-8') as out_file:
        for path in file_paths:
            out_file.write(f"\n\n=== File: {path} ===\n")
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    out_file.write(content)
            except Exception as e:
                out_file.write(f"[Error reading file]: {e}")

if __name__ == "__main__":  # ✅ fixed here
    files = [
       r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components\ActivitySuggestions.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components\CityInputForm.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components\Footer.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components\Header.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components\OutfitRecommendation.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components\SocialShare.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components\UserPreferences.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components\WardrobeManager.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components\WeatherAlerts.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components\WeatherDisplay.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components\WeatherForecast.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\components\WeatherIcon.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\hooks",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\hooks\useGeolocation.ts",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\hooks\useOfflineCache.ts",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\hooks\useTranslation.ts",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\hooks\useUserPreferences.ts",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\hooks\useWardrobe.ts",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\hooks\useWeatherAPI.ts",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\types",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\types\lucide-react.d.ts",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\App.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\index.css",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\main.tsx",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src\vite-env.d.ts",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\public",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\public\manifest.json",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\public\sw.js",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\src",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\.env",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\.gitignore",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\eslint.config.js",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\index.html",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\package.json",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\postcss.config.js",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\tailwind.config.js",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\tsconfig.app.json",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\tsconfig.json",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\tsconfig.node.json",
r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\vite.config.ts",
    ]
    
    output = r"C:\Users\Dell\Downloads\project-bolt-sb1-dbc7xrpk (1)\project\output.txt"
    save_files_data(files, output)
    print(f"Data saved to {output}")
