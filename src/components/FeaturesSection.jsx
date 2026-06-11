import { useEffect, useRef, useState } from "react";
import imgRedSulawesi from "../assets/Red-Sulawesi-bag.png";
import imgUrigacheffe from "../assets/Urigacheffe-bag.png";
import imgTanzaniaPeaberry from "../assets/Tanzania-Peaberry-bag.png";
import imgPanamaGeisha from "../assets/Panama-Geisha.png";
import imgVietnameserobusta from "../assets/Vietnamese-Robusta.png";
import imgBrazilianSantos from "../assets/Brazilian-Santos-bag.png";
import imgCostaRicaTarrazu from "../assets/Costa-Rica-Tarrazu-bag.png";
import imgGuatemalaAntigua from "../assets/Guatemala-Antigua-bag.png";
import imgKenyaAA from "../assets/Kenya-AA-bag.png";
import imgSumatraMandheling from "../assets/Sumatra-Mandheling-bag.png";
import imgKona from "../assets/Kona-bag.png";
import imgJamaicanBlueMountain from "../assets/Jamaican-Blue-Mountain-bag.png";
import imgColombianSupremo from "../assets/Colombian-Supremo-Bag.png";
import imgEthiopianHarrar from "../assets/Ethiopian-Harrar-bag.png";
import imgArabianMocha from "../assets/Arabian-Mocha-bag.png";

const row1 = [
    imgJamaicanBlueMountain,
    imgEthiopianHarrar,
    imgGuatemalaAntigua,
    imgTanzaniaPeaberry,
    imgColombianSupremo,
    imgVietnameserobusta,
    imgKona,
    imgArabianMocha,
    imgKenyaAA,
    imgUrigacheffe,
    imgSumatraMandheling,
    imgPanamaGeisha,
    imgRedSulawesi,
    imgCostaRicaTarrazu,
    imgBrazilianSantos
];

const row2 = [
    imgKenyaAA,
    imgSumatraMandheling,
    imgVietnameserobusta,
    imgArabianMocha,
    imgPanamaGeisha,
    imgGuatemalaAntigua,
    imgJamaicanBlueMountain,
    imgColombianSupremo,
    imgUrigacheffe,
    imgTanzaniaPeaberry,
    imgEthiopianHarrar,
    imgKona,
    imgRedSulawesi,
    imgBrazilianSantos,
    imgCostaRicaTarrazu
];

const row3 = [
    imgGuatemalaAntigua,
    imgJamaicanBlueMountain,
    imgEthiopianHarrar,
    imgKona,
    imgUrigacheffe,
    imgTanzaniaPeaberry,
    imgKenyaAA,
    imgColombianSupremo,
    imgVietnameserobusta,
    imgSumatraMandheling,
    imgPanamaGeisha,
    imgArabianMocha,
    imgRedSulawesi,
    imgCostaRicaTarrazu,
    imgBrazilianSantos
];

function ImageRow({ images, speed = -0.25, offset = 0 }) {
    // Double the images so the row is wide enough to never show gaps
    const doubled = [...images, ...images];

    return (
        <div className="carousel-row" style={{ transform: `translate3d(${offset}px, 0, 0)` }}>
            {doubled.map((src, index) => (
            <div key={index} className="carousel-card" key={`${index}`}>
                <img
                src={src}
                alt={`Coffee Bag ${(index % images.length) + 1}`}
                className="carousel-image"
                loading="lazy"
                />
            </div>
            ))}
        </div>
    );
}

export default function FeaturesSection() {
    const sectionRef = useRef(null);
    const [offset, setOffset] = useState([0, 0, 0]);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const viewH = window.innerHeight;
            //Progress: 0 when section enter bottom, 1 when it leaves top
            const progress = 1 - rect.bottom / (viewH + rect.height);
            const p = Math.max(0, Math.min(1, progress));

            // Each row moves at different speeds/directions based on scroll progress 
            // Use total row width estimate to keep things in range
            const range = 600;
            setOffset([
                -p * range, // row 1: slides left
                p * range - range, // row 2: slides right (starts offset left)
                -p * range * 0.7 // row 3: slides left slower
            ]); 
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="carousel-gallery-section" ref={sectionRef}>
            <div className="carousel-gallery-container">
                <ImageRow images={row1} offset={offset[0]} />
                <ImageRow images={row2} offset={offset[1]} />
                <ImageRow images={row3} offset={offset[2]} />
            </div>
        </section>
    );
}