import React, { useState } from 'react';
import {
    Eye,
    Zap,
    Palette,
    Grid,
    Info,
    ChevronRight,
    Search,
    RefreshCw
} from 'lucide-react';
import RealitySimulator from './VisionModules/RealitySimulator';
import AcuityTest from './VisionModules/AcuityTest';
import ColorTest from './VisionModules/ColorTest';
import DistortionGrid from './VisionModules/DistortionGrid';
import ContrastTest from './VisionModules/ContrastTest';

const VisionLab: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'acuity' | 'color' | 'distortion' | 'simulator' | 'contrast'>('simulator');

    const tabs = [
        { id: 'simulator', name: 'Gerçeklik Simülatörü', icon: Eye, description: 'Göz hastalıklarını deneyimleyin' },
        { id: 'acuity', name: 'Keskinlik Laboratuvarı', icon: Search, description: 'Görüş netliğinizi test edin' },
        { id: 'color', name: 'Renk Krallığı', icon: Palette, description: 'Renk hassasiyetinizi ölçün' },
        { id: 'contrast', name: 'Kontrast Testi', icon: Zap, description: 'Ayırt etme yeteneği' },
        { id: 'distortion', name: 'Distorsiyon Ağı', icon: Grid, description: 'Merkezi görme kontrolü' },
    ] as const;

    return (
        <div className="vision-lab-container">
            <div className="lab-sidebar lab-glass">
                <div className="sidebar-header">
                    <h2>Vision Lab <span className="version">v2.0</span></h2>
                    <p>İnteraktif Görme Analiz Merkezi</p>
                </div>
                <nav className="lab-nav">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon size={20} className="icon" />
                            <div className="nav-content">
                                <span className="title">{tab.name}</span>
                                <span className="desc">{tab.description}</span>
                            </div>
                            <ChevronRight size={16} className="arrow" />
                        </button>
                    ))}
                </nav>
            </div>

            <div className="lab-main lab-glass">
                <div className="module-content">
                    {activeTab === 'simulator' && <RealitySimulator />}
                    {activeTab === 'acuity' && <AcuityTest />}
                    {activeTab === 'color' && <ColorTest />}
                    {activeTab === 'contrast' && <ContrastTest />}
                    {activeTab === 'distortion' && <DistortionGrid />}
                </div>
            </div>

            <style>{`
                .vision-lab-container {
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    gap: 2rem;
                    min-height: 700px;
                    padding: 2rem;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    border-radius: 32px;
                    color: white;
                    font-family: 'Inter', sans-serif;
                }

                .lab-glass {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 24px;
                }

                .lab-sidebar {
                    padding: 2rem 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }

                .sidebar-header h2 {
                    font-size: 1.5rem;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .version {
                    font-size: 0.75rem;
                    background: var(--accent-green);
                    color: white;
                    padding: 0.1rem 0.5rem;
                    border-radius: 50px;
                    font-weight: 700;
                }

                .sidebar-header p {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.5);
                    margin: 0.25rem 0 0;
                }

                .lab-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.25rem;
                    border-radius: 16px;
                    background: transparent;
                    border: 1px solid transparent;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    text-align: left;
                    width: 100%;
                }

                .nav-item:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(255, 255, 255, 0.1);
                }

                .nav-item.active {
                    background: rgba(0, 86, 179, 0.4);
                    border-color: #0056B3;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                }

                .nav-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }

                .nav-content .title {
                    font-weight: 600;
                    font-size: 0.95rem;
                    margin-bottom: 0.1rem;
                }

                .nav-content .desc {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.5);
                }

                .nav-item.active .desc {
                    color: rgba(255, 255, 255, 0.8);
                }

                .nav-item .icon {
                    color: rgba(255, 255, 255, 0.5);
                    transition: color 0.3s;
                }

                .nav-item.active .icon {
                    color: #4ade80;
                }

                .nav-item .arrow {
                    opacity: 0;
                    transform: translateX(-10px);
                    transition: all 0.3s;
                }

                .nav-item.active .arrow {
                    opacity: 1;
                    transform: translateX(0);
                }

                .lab-main {
                    padding: 2rem;
                    overflow: hidden;
                    position: relative;
                }

                .module-content {
                    height: 100%;
                    animation: fadeIn 0.5s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 1024px) {
                    .vision-lab-container {
                        grid-template-columns: 1fr;
                        padding: 1rem;
                    }
                    .lab-sidebar {
                        padding: 1.5rem;
                    }
                    .lab-nav {
                        flex-direction: row;
                        overflow-x: auto;
                        padding-bottom: 1rem;
                    }
                    .nav-item {
                        min-width: 250px;
                    }
                }
            `}</style>
        </div>
    );
};

export default VisionLab;
