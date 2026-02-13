import { Injectable } from '@angular/core';
import { TemplateConfig } from '../models/template.model';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    private templates: TemplateConfig[] = [
        // ORIGINAL 3 (STRICT IDs)
        { id: 'modern', name: 'Modern Indigo', description: 'Bold header with a professional side-bar layout.', primaryColor: '#4f46e5', fontFamily: 'Inter', layoutType: 'standard' },
        { id: 'minimal', name: 'Minimal Serif', description: 'Clean, elegant, and timeless serif design.', primaryColor: '#10b981', fontFamily: 'Merriweather', layoutType: 'standard' },
        { id: 'executive', name: 'Executive Sidebar', description: 'Power sidebar for high-level professional impact.', primaryColor: '#8b5cf6', fontFamily: 'Inter', layoutType: 'standard' },

        // NEW VARIATIONS
        { id: 'pro-1', name: 'ATS Sentinel', description: 'Optimized for machine reading and clarity.', primaryColor: '#0f172a', fontFamily: 'Inter', layoutType: 'ats', isAtsOptimized: true },
        { id: 'pro-2', name: 'Creative Grid', description: 'Modern grid-based layout for designers.', primaryColor: '#ec4899', fontFamily: 'Outfit', layoutType: 'grid' },
        { id: 'pro-3', name: 'Tech Compact', description: 'Densely packed info for technical roles.', primaryColor: '#2563eb', fontFamily: 'JetBrains Mono', layoutType: 'compact' },
        { id: 'pro-4', name: 'Elegant Gold', description: 'Sophisticated design with gold accents.', primaryColor: '#d4af37', fontFamily: 'Playfair Display', layoutType: 'elegant' },
        { id: 'pro-5', name: 'Dark Mode Pro', description: 'Deep tones for a unique digital presence.', primaryColor: '#1e293b', fontFamily: 'Inter', layoutType: 'modern' },
        { id: 'pro-6', name: 'Classic Chrono', description: 'Traditional chronological layout.', primaryColor: '#475569', fontFamily: 'Libre Baskerville', layoutType: 'standard' },
        { id: 'pro-7', name: 'Soft Pastel', description: 'Gentle colors for academic roles.', primaryColor: '#94a3b8', fontFamily: 'Inter', layoutType: 'minimal' },
        { id: 'pro-8', name: 'Bold Impact', description: 'Strong typography and clear sections.', primaryColor: '#000000', fontFamily: 'Poppins', layoutType: 'bold' },
        { id: 'pro-9', name: 'Skyline Modern', description: 'Fresh, airy layout with blue highlights.', primaryColor: '#0ea5e9', fontFamily: 'Outfit', layoutType: 'modern' },
        { id: 'pro-10', name: 'Ruby Executive', description: 'Passionate and bold leadership design.', primaryColor: '#be123c', fontFamily: 'Inter', layoutType: 'sidebar' },
        { id: 'pro-11', name: 'Emerald Clean', description: 'Crisp green touches for clarity.', primaryColor: '#059669', fontFamily: 'Inter', layoutType: 'minimal' },
        { id: 'pro-12', name: 'Corporate Blue', description: 'Formal banking and legal style.', primaryColor: '#1e3a8a', fontFamily: 'Times New Roman', layoutType: 'standard' },
        { id: 'pro-13', name: 'Startup Vibe', description: 'Trendy and fast-paced tech design.', primaryColor: '#f59e0b', fontFamily: 'Space Grotesk', layoutType: 'modern' },
        { id: 'pro-14', name: 'Professor Serif', description: 'Academic focus with deep serif roots.', primaryColor: '#451a03', fontFamily: 'Lora', layoutType: 'classic' },
        { id: 'pro-15', name: 'Minimalist Dot', description: 'Punctuated sections for readability.', primaryColor: '#64748b', fontFamily: 'Inter', layoutType: 'minimal' },
        { id: 'pro-16', name: 'Vibrant Pulse', description: 'Energetic and modern color palette.', primaryColor: '#8b5cf6', fontFamily: 'Plus Jakarta Sans', layoutType: 'modern' },
        { id: 'pro-17', name: 'Studio Artist', description: 'Visual-friendly arts and media layout.', primaryColor: '#db2777', fontFamily: 'Inter', layoutType: 'grid' },

        // PHOTO TEMPLATES
        { id: 'photo-1', name: 'Modern Circle', description: 'Clean layout with a circular profile photo.', primaryColor: '#4f46e5', fontFamily: 'Inter', layoutType: 'modern' },
        { id: 'photo-2', name: 'Classic Square', description: 'Timeless design with a professional square photo.', primaryColor: '#059669', fontFamily: 'Merriweather', layoutType: 'standard' },
        { id: 'photo-3', name: 'Sidebar Left', description: 'Distinctive sidebar with photo focus.', primaryColor: '#7c3aed', fontFamily: 'Inter', layoutType: 'sidebar' },
        { id: 'photo-4', name: 'Header Banner', description: 'Bold header banner with overlay photo.', primaryColor: '#1e40af', fontFamily: 'Outfit', layoutType: 'modern' },
        { id: 'photo-5', name: 'Minimalist', description: 'Ultra-clean design with subtle photo placement.', primaryColor: '#374151', fontFamily: 'Inter', layoutType: 'minimal' },
        { id: 'photo-6', name: 'Bold Header', description: 'Impactful header with integrated photo.', primaryColor: '#312e81', fontFamily: 'Outfit', layoutType: 'modern' },
        { id: 'photo-7', name: 'Left Accent', description: 'Distinctive left border with large photo.', primaryColor: '#be123c', fontFamily: 'Inter', layoutType: 'sidebar' },
        { id: 'photo-8', name: 'Centered Minimal', description: 'Center-aligned photo for a clean look.', primaryColor: '#475569', fontFamily: 'Lato', layoutType: 'minimal' },
        { id: 'photo-9', name: 'Split Contrast', description: 'High contrast split screen design.', primaryColor: '#0f172a', fontFamily: 'Montserrat', layoutType: 'modern' },
        { id: 'photo-10', name: 'Floating Card', description: 'Modern card-based layout with shadow.', primaryColor: '#4f46e5', fontFamily: 'Inter', layoutType: 'modern' },

        // ATS TEMPLATES
        { id: 'ats-1', name: 'Standard Serif', description: 'Classic, parse-friendly serif layout.', primaryColor: '#000000', fontFamily: 'Merriweather', layoutType: 'ats', isAtsOptimized: true },
        { id: 'ats-2', name: 'Clean Sans', description: 'Simple, legible sans-serif for ATS.', primaryColor: '#000000', fontFamily: 'Arial', layoutType: 'ats', isAtsOptimized: true },
        { id: 'ats-3', name: 'Compact Tech', description: 'Dense, monospaced layout for technical roles.', primaryColor: '#000000', fontFamily: 'Roboto Mono', layoutType: 'ats', isAtsOptimized: true },
        { id: 'ats-4', name: 'Executive Simple', description: 'Sophisticated, no-frills executive style.', primaryColor: '#1e293b', fontFamily: 'Inter', layoutType: 'ats', isAtsOptimized: true },
        { id: 'ats-5', name: 'Academic Plain', description: 'Traditional academic CV format.', primaryColor: '#000000', fontFamily: 'Times New Roman', layoutType: 'ats', isAtsOptimized: true }
    ];

    getTemplates(): TemplateConfig[] {
        return this.templates;
    }

    getTemplateById(id: string): TemplateConfig | undefined {
        return this.templates.find(t => t.id === id) || this.templates[0];
    }
}
