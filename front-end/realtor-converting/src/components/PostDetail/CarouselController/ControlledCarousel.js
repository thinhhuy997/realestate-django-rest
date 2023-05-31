import {Carousel} from "react-bootstrap";
import {useState} from "react";

function convertImg(imgs) {
    var img_urls = [];

    try {
        for (const [key, value] of Object.entries(imgs)) {
            if (key === "id") continue;
            try {
                if (imgs[key].includes("https%3A")) {
                    let img_new_url = imgs[key].replace("/real_estate/media/", "");
                    img_new_url = img_new_url.replace("https%3A", "https:");
                    img_urls.push(img_new_url);
                } else {
                    console.log(imgs[key]);
                    img_urls.push("http://127.0.0.1:8000" + imgs[key]);
                }
            } catch (e) {
                // img_urls.push("https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg");
            }
        }
    } catch (e) {
        img_urls.push("https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg")
    }

    return img_urls;
}

function ControlledCarousel(props) {
    const [index, setIndex] = useState(0);
    const {imgs} = props;
    const {videos} = props;
    console.log(videos)
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    // console.log("img in caro...",convertImg(imgs));
// https://cdn.eva.vn/upload/3-2021/images/2021-09-10/image3-1631239323-278-width600height350.jpg
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>

            {convertImg(imgs).map(url => (
                <Carousel.Item>
                    <img
                        style={{height: 500 + 'px'}}
                        className="d-block w-100"
                        src={url}
                        // alt="First slide"
                    />
                    <Carousel.Caption>
                        {/*<h3>First slide label</h3>*/}
                        {/*<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}

            {videos && 
            videos.video_1 && <Carousel.Item>
            <video className="d-block w-100" autoPlay loop muted>
                <source src={`http://127.0.0.1:8000${videos.video_1}`} type="video/mp4"/>
            </video>
            </Carousel.Item>}
            {videos && 
            videos.video_2 && <Carousel.Item>
            <video className="d-block w-100" autoPlay loop muted>
                <source src={`http://127.0.0.1:8000${videos.video_2}`} type="video/mp4"/>
            </video>
            </Carousel.Item>}
            {videos && 
            videos.video_3 && <Carousel.Item>
            <video className="d-block w-100" autoPlay loop muted>
                <source src={`http://127.0.0.1:8000${videos.video_3}`} type="video/mp4"/>
            </video>
            </Carousel.Item>}
            {videos && 
            videos.video_4 && <Carousel.Item>
            <video className="d-block w-100" autoPlay loop muted>
                <source src={`http://127.0.0.1:8000${videos.video_4}`} type="video/mp4"/>
            </video>
            </Carousel.Item>}
            {videos && 
            videos.video_5 && <Carousel.Item>
            <video className="d-block w-100" autoPlay loop muted>
                <source src={`http://127.0.0.1:8000${videos.video_5}`} type="video/mp4"/>
            </video>
            </Carousel.Item>}

        </Carousel>
    );
}

export default ControlledCarousel;