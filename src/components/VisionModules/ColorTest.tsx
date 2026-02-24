import React, { useState, useEffect } from 'react';

const ColorTest: React.FC = () => {
    const [round, setRound] = useState(1);
    const [targetPos, setTargetPos] = useState({ r: 0, c: 0 });
    const [baseColor, setBaseColor] = useState('#4ade80');
    const [targetColor, setTargetColor] = useState('#4ade80');
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);

    const gridSize = Math.min(round + 2, 8);

    const generateRound = () => {
        const h = Math.floor(Math.random() * 360);
        const s = 60 + Math.random() * 20;
        const l = 40 + Math.random() * 20;

        const diff = Math.max(25 - round * 2, 4);

        setBaseColor(`hsl(${h}, ${s}%, ${l}%)`);
        setTargetColor(`hsl(${h}, ${s}%, ${l + diff}%)`);
        setTargetPos({
            r: Math.floor(Math.random() * gridSize),
            c: Math.floor(Math.random() * gridSize)
        });
    };

    useEffect(() => {
        if (!isFinished) generateRound();
    }, [round, isFinished]);

    const handleCellClick = (r: number, c: number) => {
        if (r === targetPos.r && c === targetPos.c) {
            if (round < 15) {
                setRound(round + 1);
                setScore(score + 10);
            } else {
                setIsFinished(true);
            }
        } else {
            setIsFinished(true);
        }
    };

    return (
        <div className="module-color">
            <div className="module-header">
                <h3>Renk Krallığı</h3>
                <p>Gizlenmiş tonları bularak renk duyarlılığınızı keşfedin.</p>
            </div>

            <div className="color-display glass">
                {!isFinished ? (
                    <div className="test-vessel">
                        <div className="color-grid" style={{
                            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                            width: '400px',
                            height: '400px'
                        }}>
                            {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                                const r = Math.floor(i / gridSize);
                                const c = i % gridSize;
                                const isTarget = r === targetPos.r && c === targetPos.c;
                                return (
                                    <div
                                        key={i}
                                        className="color-cell"
                                        style={{ background: isTarget ? targetColor : baseColor }}
                                        onClick={() => handleCellClick(r, c)}
                                    />
                                );
                            })}
                        </div>
                        <div className="stats">
                            <span>Seviye: {round}/15</span>
                            <span>Skor: {score}</span>
                        </div>
                    </div>
                ) : (
                    <div className="result-vessel">
                        <div className="score-badge">Puan: {score}</div>
                        <h4>Mükemmel Gözlem!</h4>
                        <p>Renk ayrıştırma yeteneğiniz klinik standartlara göre analiz edilmiştir.</p>
                        <button onClick={() => { setRound(1); setScore(0); setIsFinished(false); }} className="btn-primary">Yeniden Dene</button>
                    </div>
                )}
            </div>

            <style>{`
                .module-color {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    height: 100%;
                }

                .module-header h3 {
                    font-size: 1.8rem;
                    margin: 0;
                    color: #a78bfa;
                }

                .color-display {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0,0,0,0.2);
                    border-radius: 24px;
                }

                .color-grid {
                    display: grid;
                    gap: 8px;
                    margin-bottom: 2rem;
                }

                .color-cell {
                    border-radius: 8px;
                    cursor: pointer;
                    transition: transform 0.1s;
                }

                .color-cell:hover {
                    transform: scale(0.95);
                }

                .stats {
                    display: flex;
                    justify-content: space-between;
                    font-weight: 700;
                    color: #a78bfa;
                }

                .score-badge {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #a78bfa;
                    margin-bottom: 2rem;
                }
            `}</style>
        </div>
    );
};

export default ColorTest;
