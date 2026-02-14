import os
import re

def revert_template(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define the mapping of translation keys to original English labels
    # Matching keys from en.json: CV_TEMPLATES.LABELS.*
    mapping = {
        r"\{\{\s*'CV_TEMPLATES\.LABELS\.PROFILE'\s*\|\s*translate\s*\}\}": "Profile",
        r"\{\{\s*'CV_TEMPLATES\.LABELS\.EXPERIENCE'\s*\|\s*translate\s*\}\}": "Experience",
        r"\{\{\s*'CV_TEMPLATES\.LABELS\.PROJECTS'\s*\|\s*translate\s*\}\}": "Projects",
        r"\{\{\s*'CV_TEMPLATES\.LABELS\.EDUCATION'\s*\|\s*translate\s*\}\}": "Education",
        r"\{\{\s*'CV_TEMPLATES\.LABELS\.SKILLS'\s*\|\s*translate\s*\}\}": "Skills",
        r"\{\{\s*'CV_TEMPLATES\.LABELS\.LANGUAGES'\s*\|\s*translate\s*\}\}": "Languages",
        r"\{\{\s*'CV_TEMPLATES\.LABELS\.CONTACT'\s*\|\s*translate\s*\}\}": "Contact",
        r"\{\{\s*'CV_TEMPLATES\.LABELS\.SUMMARY'\s*\|\s*translate\s*\}\}": "Summary",
        # Specific tags sometimes used in older versions of the script
        r"\{\{\s*'CV_TEMPLATES\.LABELS\.CAREER_HISTORY'\s*\|\s*translate\s*\}\}": "Career History",
        r"\{\{\s*'CV_TEMPLATES\.LABELS\.FORMATION'\s*\|\s*translate\s*\}\}": "Formation",
        r"\{\{\s*'CV_TEMPLATES\.LABELS\.TOOLKIT'\s*\|\s*translate\s*\}\}": "Toolkit",
        r"\{\{\s*'CV_TEMPLATES\.LABELS\.KEY_WORKS'\s*\|\s*translate\s*\}\}": "Key Works"
    }

    new_content = content
    for pattern, replacement in mapping.items():
        new_content = re.sub(pattern, replacement, new_content)

    # Remove TranslateModule from imports array
    new_content = re.sub(r',\s*TranslateModule\s*(?=\])', '', new_content)
    new_content = re.sub(r'TranslateModule\s*,\s*', '', new_content)
    # Remove stand-alone TranslateModule in case it was the only one (unlikely but safe)
    new_content = re.sub(r'\[\s*TranslateModule\s*\]', '[CommonModule]', new_content) # Assuming CommonModule is always there

    # Remove the import statement
    new_content = re.sub(r"import\s*{\s*TranslateModule\s*}\s*from\s*['\"]@ngx-translate/core['\"];?\n?", "", new_content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    base_dir = '/media/mohamed-wael/B23053E03053A9DD/Codveda/resume-ai/src/app/pages/cv-creation/components/cv-templates'
    reverted_count = 0
    
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.component.ts') and 'shared' not in root:
                if revert_template(os.path.join(root, file)):
                    reverted_count += 1
                    print(f"Reverted: {file}")

    print(f"Total templates reverted: {reverted_count}")

if __name__ == "__main__":
    main()
