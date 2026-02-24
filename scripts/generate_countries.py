import requests
import json

def get_country_data():
    url = "https://restcountries.com/v3.1/all?fields=name,idd,translations"
    try:
        response = requests.get(url)
        response.raise_for_status()
        countries = response.json()
        
        result = []
        for c in countries:
            name = c.get('translations', {}).get('tur', {}).get('common') or c.get('name', {}).get('common')
            idd = c.get('idd', {})
            root = idd.get('root', '')
            suffixes = idd.get('suffixes', [])
            
            if not root:
                continue
            
            # For countries with many suffixes (like USA +1), we just use the root or first suffix
            # But usually it's better to show them as +1, +44, etc.
            # If there's only one suffix, combine them. If many, just use root.
            if len(suffixes) == 1:
                dial_code = root + suffixes[0]
            else:
                dial_code = root
                
            result.append({
                "name": name,
                "code": dial_code
            })
            
        # Sort by name
        result.sort(key=lambda x: x['name'])
        
        # Move Turkey to the top
        turkey = next((c for c in result if c['name'] == 'Türkiye'), None)
        if turkey:
            result.remove(turkey)
            result.insert(0, turkey)
            
        return result
    except Exception as e:
        print(f"Error: {e}")
        return []

def generate_ts(data):
    content = "export const countries = " + json.dumps(data, ensure_ascii=False, indent=4) + ";"
    with open("src/data/countries.ts", "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    data = get_country_data()
    if data:
        generate_ts(data)
        print(f"Successfully generated src/data/countries.ts with {len(data)} countries.")
    else:
        print("Failed to get data.")
