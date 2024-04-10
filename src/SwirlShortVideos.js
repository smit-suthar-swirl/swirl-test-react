import React, { useState, useRef, Fragment } from "react";
import Slider from "react-slick";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { MdOutlineStarPurple500 } from "react-icons/md";
// import { MdOutlineStarOutline } from "react-icons/md";
import axios from "axios";
import { useEffect } from "react";
import { useCallback } from "react";
// import moment from "moment";
// import "./ssv.css"
const ReviewCompoNent = ({ skuCode, height, show }) => {
    const [reviewData, setreviewData] = useState([])
    const [loading, setLoading] = useState(true)
    // alert("show")
    useEffect(() => {
        const fetchData = async () => {

            try {

                if (skuCode && show) {
                    const res = await axios.get(`https://account.lifecell.in/api/pdp/get-reviews?sku=${skuCode}`);
                    if (res.data) {
                        if (res.data.data.data.products.items) {
                            setreviewData(res?.data?.data?.data?.products?.items[0])

                            setLoading(false)
                        } else {
                            setreviewData([])
                            setLoading(false)
                        }
                    } else {
                        setreviewData([])
                        setLoading(false)
                    }
                }
                setLoading(false)
                // setreviewData(res.data);
            } catch (error) {
                console.log(error);
                setreviewData([])
                setLoading(false)
            }
        };

        fetchData();
    }, [skuCode, show]);


    return (
        <div style={{ color: "black", flexGrow: "1", padding: "15px 10px" }}>
            {loading ? <><div style={{ textAlign: "center", padding: "30px" }}>Loading</div></> : <>
                {reviewData?.review_count > 0 && <div style={{ display: "flex", alignItems: "space-between" }}>
                    <span className="swirl_ratings_total" >
                        <svg width="16" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m7.843 12.554 3.803 2.3c.697.423 1.55-.2 1.366-.989l-1.008-4.326 3.364-2.915c.614-.531.284-1.54-.523-1.604l-4.427-.375L8.686.557C8.374-.186 7.311-.186 7 .557L5.267 4.635.84 5.011C.034 5.075-.296 6.084.318 6.615L3.682 9.53l-1.008 4.326c-.184.788.669 1.411 1.365.99l3.804-2.292Z" fill="#FFC600"></path></svg>
                        <span>{reviewData?.rating}</span>

                    </span>
                    <div style={{ display: "flex", alignItems: "center", fontSize: "16px", marginLeft: "5px" }}>
                        <img style={{ height: "20px" }} src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/webp/verified-tick.webp" />
                        <span style={{ marginLeft: "5px" }}>{reviewData?.review_count} Reviews</span>
                    </div>
                </div>}
            </>}
            {/* {loading ? <><div style={{ textAlign: "center", padding: "30px" }}>Loading</div></> : <>
                {reviewData?.length > 0 && <>
                    <div className="swirl_ssv_description_product" style={{ borderBottom: "1px solid #eee" }}>
                        <h3 style={{ margin: "0px 0 0 0", padding: "7px 15px 7px 15px" }}>Reviews ({reviewData.length})</h3>
                    </div>
                    <div style={{ height: innerWidth < 833 ? "" : height, overflow: "auto" }}>
                        {reviewData && reviewData?.map((el) => {
                            return <div style={{ padding: "10px 20px", background: "#fff", display: "flex", borderBottom: "1px solid #eee", justifyContent: "space-between", alignItems: "flex-start" }}>

                                <div style={{ width: "80%" }}>
                                    <h4 style={{ margin: "0", padding: "0", fontWeight: "600", fontSize: "14px" }}>{el?.nickname}</h4>

                                    <div className="swirl_ssv_rating" style={{ fontSize: "20px", margin: "0", padding: "0" }}>
                                        {renderStars(parseInt(el.ratings_breakdown[0].value))}
                                    </div>
                                    <p style={{ margin: "0", padding: "0", fontSize: "13px" }}>{el.text}</p>

                                </div>
                                <div>
                                    <span style={{ fontSize: "13px", color: "rgba(0,0,0,0.7)" }}>{moment(el?.created_at, 'YYYY-MM-DD HH:mm:ss').fromNow(true)}</span></div>
                            </div>
                        })}
                    </div>
                </>}</>} */}


        </div>
    )
}


// const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//         if (i < rating) {
//             stars.push(<MdOutlineStarPurple500 size={18} color="#FFD700" />);
//         } else {
//             stars.push(<MdOutlineStarOutline size={18} color="#FFD700" />);
//         }
//     }
//     return stars;
// };
function disableScrollssv() {
    var scrollPosition = [
        window.pageXOffset ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft,
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop,
    ];
    var html = document.documentElement; // Use document.documentElement for modern browsers
    html.setAttribute("data-scroll-position", JSON.stringify(scrollPosition));
    html.setAttribute("data-previous-overflow", html.style.overflow);
    html.style.overflow = "hidden";
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
}
const redirectTOPDP = (buyNowStatus, buyNowUrl) => {
    if (buyNowStatus === 1 && buyNowUrl !== undefined) {
        window.open(buyNowUrl)
    }
}

function enableScrollssv() {
    var html = document.documentElement;
    var scrollPosition = JSON.parse(html.getAttribute("data-scroll-position"));
    html.style.overflow = html.getAttribute("data-previous-overflow");
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
}
// import "./swirl.css";
let muted = false;

const checkInWishListOrNot = (wishlistData, targetSku) => {
    const obj = wishlistData?.find(
        (obj) => obj?.product && obj?.product?.sku === targetSku,
    );

    return {
        status: wishlistData?.some(
            (obj) => obj?.product && obj?.product?.sku === targetSku,
        ),
        obj: obj,
    };
};
const Modal = ({ children, show, onClose, title, innerHeight }) => {
    return (
        // show && (
        <div id="swil_ssv_modal_div" style={{ display: show ? "block" : "none" }}>
            <div className="swirl_ssv_modal-backdrop" onClick={onClose} />
            <div
                className="swirl_ssv_modal-wrapper"
                style={{ backgroundColor: "rgba(0,0,0,0.9" }}
            >
                {children}
            </div>
        </div>
    )
    // );
};

const ErrorBox = ({ errorMessage, isVisibleMsg, setIsVisibleMsg }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisibleMsg(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, [isVisibleMsg, setIsVisibleMsg]);

    return (
        <div
            style={{
                transition: "opacity 0.4s ease-out",
                // opacity: 1,
                width: errorMessage.length > 15 ? "250px" : "150px",
                display: isVisibleMsg ? "block" : "none",
                opacity: isVisibleMsg ? 1 : 0,
                backgroundColor: "#00000080",
                color: "#fff",
                textAlign: "center",
                margin: "auto",
                padding: "4px 10px",
                fontSize: "18px",
                borderRadius: "5px",
                position: "relative",
                zIndex: "10000000",
                boxShadow: "0px 0px 6px 0px rgba(255, 255, 255, 0.5)",
            }}
        >
            {errorMessage}
        </div>
    );
};

const CartBtnLoadingComp = ({
    preViousText,
    NextText,
    loadingCart,
    setLoadingCart,
    btnId,
    loadingbtnId,
    setLoadingbtnId,
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingCart(false);
            setLoadingbtnId(null);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, [loadingCart, setLoadingCart, setLoadingbtnId]);
    if (loadingCart) {
        if (loadingbtnId === btnId) {
            return preViousText;
        } else {
            return NextText;
        }
    } else {
        return NextText;
    }
    // return loadingCart ? preViousText : NextText
};

const sliceString = (string, numberToslice) => {
    if (string?.length > numberToslice) {
        return `${string?.slice(0, numberToslice)}...`;
    } else {
        return string;
    }
};

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            className={`${className} swirl_ssv_main_screen_arrow_icon`}
            alt="pre icon"
            style={{ ...style, display: "block" }}
            onClick={onClick}
            src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/back-btn.webp"
        />
    );
}

function SamplePrevArrowSmallDiv(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} swirl_ssv_products_slider_btn_pre`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrowForModal(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} swirl_ssv_test_new_btn`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <img
            className={`${className} swirl_ssv_main_screen_arrow_icon_next`}
            alt="pre icon"
            style={{ ...style, display: "block" }}
            onClick={onClick}
            src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/next-btn.webp"
        />
    );
}
function SampleNextArrowSmallDiv(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} swirl_ssv_products_slider_btn_next`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        />
    );
}
function SampleNextArrowForModal(props) {
    const { className, style, onClick } = props;

    // Create a new object to ensure that style is always an object
    const arrowStyle = { ...style, display: "block" };

    return (
        <div
            className={`${className} swirl_ssv_test_new_btn`}
            style={arrowStyle}
            onClick={onClick}
        />
    );
}

const copyToClipboard = (text) => {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            console.log("URL copied to clipboard:", text);
            // You can add additional logic here, such as showing a success message
        })
        .catch((err) => {
            console.error("Error copying to clipboard:", err);
            // Handle any errors that occurred during copying
        });
};

const VideoComponent = ({
    onClose,
    thisVideo,
    videoLink,
    active,
    index,
    windowWidth,
    swirlData,
    pipDisPlay,
    setPipDisplay,
    dataWs,
    isVisibleMsg,
    setIsVisibleMsg,
    errorMessage,
    setErrorMessage,
    // getCartDetails,
    quantity,
    loadingCart,
    setLoadingCart,
    loadingbtnId,
    setLoadingbtnId,
    wishlistData,
    getWishlistDetails,
    removeFromWatchList,
    sliderRef,
    swipeStatus,
    setSwipeStatus,
    getAvailabiityCheck,
    cart,
    checkProductStock,
    show,
    showGif
}) => {
    const swirlSettings = swirlData?.data;
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [shareDrawerOnOrOff, setShareDrawerOnOrOff] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [msg, setMsg] = useState("");
    const [productDetalDrawer, setProductDetailDrawer] = useState(false);
    const [productData, setProductData] = useState(thisVideo.product[0]);
    const [quantityForAddToCart, setQantityForAddToCart] = useState(1);
    const [userData, setUserData] = useState({
        user_id: 0,
        username: "",
        userphonecode: "91",
        userphone: "",

        // username: Naresh
        // userphone: 7986081034
        // userphonecode: 91
    });
    const modalRef = useRef();
    const askbtnref = useRef()
    const shareModalRef = useRef()
    const shareBtnRef = useRef()
    const productRef = useRef()
    const productDrawerRef = useRef()
    const registerModalRef = useRef()
    const productSectionRefForDrawer = useRef()
    useEffect(() => {
        if (show) {
            if (active === index) {
                if (videoRef.current.paused) {
                    videoRef.current.play()
                }

            }
        } else {
            if (!videoRef.current.paused) {
                videoRef.current.pause()
            }
        }
    }, [active, index, show])

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the modal
            if (modalRef.current && !modalRef.current.contains(event.target) && askbtnref.current && !askbtnref.current.contains(event.target) && registerModalRef.current && !registerModalRef.current.contains(event.target)) {
                setIsDrawerOpen(false)
            }

            if (shareModalRef.current && !shareModalRef.current.contains(event.target) && shareBtnRef.current && !shareBtnRef.current.contains(event.target)) {
                setShareDrawerOnOrOff(false)
            }

            if (productDrawerRef.current && productDrawerRef.current.contains(event.target) && productSectionRefForDrawer.current && !productSectionRefForDrawer.current.contains(event.target)) {
                setProductDetailDrawer(false)
            }

        };

        // Attach the event listener when the modal is open
        if (isDrawerOpen || shareDrawerOnOrOff || productDetalDrawer) {
            document.addEventListener('click', handleClickOutside);
        }

        // Remove the event listener when the component is unmounted or modal is closed
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDrawerOpen, setIsDrawerOpen, shareDrawerOnOrOff, setShareDrawerOnOrOff, productDetalDrawer]);
    const handleVideoEnd = () => {
        setIsPlaying(false);
    };

    const onOffSLideMoves = () => {
        setSwipeStatus(!swipeStatus);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleQuantity = (method) => {
        if (method === "decrease") {
            setQantityForAddToCart(quantityForAddToCart - 1);
        } else {
            setQantityForAddToCart(quantityForAddToCart + 1);
        }
    };
    const handleProductDetailDrawer = () => {
        setProductDetailDrawer(!productDetalDrawer);
        onOffSLideMoves();
    };

    const videoDwn = (videoSrc) => {
        var a = document?.createElement("a");
        a.href = videoSrc;
        a.download = "video.mp4";

        document?.body.appendChild(a);
        a?.click();
        document?.body.removeChild(a);
    };

    function downloadVideo(videoSrc) {
        if (swirlSettings?.download_verfication === 1) {
            if (localStorage?.getItem("userData")) {
                videoDwn(videoSrc);
            } else {
                toggleVisibilityModal();
            }
        } else {
            videoDwn(videoSrc);
        }
    }

    const askQuestionFunction = async (e) => {
        e.preventDefault();

        if (localStorage.getItem("userData")) {
            try {
                const formData = new FormData();
                const data = JSON.parse(localStorage.getItem("userData"));

                Object.keys(data)?.forEach((key) => {
                    formData.append(key, data[key]);
                });
                formData.append("designer_id", swirlSettings?.brand_id);
                formData.append("msg", msg);
                formData.append("swirls_id", thisVideo?.video_id);

                const res = await axios.post(
                    "https://api.goswirl.live/index.php/ShortVideo/askquestion",
                    formData,
                );
                if (res.status === 200) {
                    // toast.success("Message sent successfully");
                    console.log("success");
                    setErrorMessage("Your query is submitted.Thank You!");
                    setIsVisibleMsg(true);
                    toggleDrawer();
                    setMsg("")
                    e.target.reset();
                } else {
                    console.log("error");

                    setErrorMessage("Something went wrong, Please try again!");
                    setIsVisibleMsg(true);
                }



            } catch (error) {
                // toast.error("Something went wrong, Please try again!");
                console.log(error);
                setErrorMessage("Something went wrong, Please try again!");
                setIsVisibleMsg(true);
            }
        } else {
            toggleVisibilityModal();
        }
    };

    const toggleVisibilityModal = () => {
        setIsVisibleModal(!isVisibleModal);
    };

    const toggleshareDrawer = () => {
        setIsDrawerOpen(false)
        setShareDrawerOnOrOff(!shareDrawerOnOrOff);
    };

    const handleHover = () => {
        if (!productDetalDrawer && !showGif) {
            setIsVisible(false);
        }

    };
    const toggleDrawer = () => {
        setShareDrawerOnOrOff(false);
        if (!isDrawerOpen) {
            setSwipeStatus(false)
        } else {
            setSwipeStatus(true)
        }
        setIsDrawerOpen((prevState) => !prevState);

    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, [isVisible]);

    const handleMouseLeave = () => {
        setIsVisible(true);
    };

    const togglePlayPause = () => {
        const video = videoRef?.current;

        if (video) {
            if (isPlaying) {
                video?.pause();
            } else {
                video?.play();
            }

            setIsPlaying(!isPlaying);
        }
    };

    const handleToggleMute = () => {
        const video = videoRef.current;

        if (video) {
            video.muted = !isMuted;
            setIsMuted((prevState) => !prevState);
            muted = !muted;
        }
    };

    const handleForward = () => {
        const video = videoRef.current;

        if (video) {
            video.currentTime += 10;
            video?.play();
            setIsPlaying(true);
        }
    };

    const handleBackward = () => {
        const video = videoRef.current;

        if (video) {
            video.currentTime -= 10;
            video?.play();
            setIsPlaying(true);
        }
    };

    const handlePlayInPIP = (videoData) => {
        if (videoData) {
            localStorage.setItem("_pip_video_data", JSON.stringify(videoData));
            setPipDisplay(true);
            onClose();
        } else {
            console.error("Error : Not getting video data ");
        }
        // try {
        //     await videoRef.current.play();
        //     if (document.pictureInPictureEnabled) {
        //         onClose();
        //         await videoRef.current.requestPictureInPicture();
        //     }
        // } catch (error) {
        //     console.error("Error playing video:", error);
        // }
    };
    useEffect(() => {
        const handleTimeUpdate = () => {
            setCurrentTime(videoRef?.current?.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(videoRef?.current?.duration);
        };

        videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
        videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
        if (swirlSettings?.auto_play_mute_un === "1") {
            setIsMuted(true);
            muted = true;
        }
    }, [swirlSettings]);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            userData.username === "" ||
            userData.userphone === "" ||
            userData.userphonecode === ""
        ) {
            setErrorMessage("Please fill all the field");
            setIsVisibleMsg(true);
        } else {
            if (userData?.userphone?.length === 10) {
                localStorage.setItem("userData", JSON.stringify(userData));
                toggleVisibilityModal();


                await askQuestionFunction(e)
            } else {
                setErrorMessage("Invalid mobile number!");
                setIsVisibleMsg(true);
            }

        }
    };
    const settings3 = {
        dots: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        initialSlide: 0,
        adaptiveHeight: true,
        prevArrow: <SamplePrevArrowSmallDiv />,
        nextArrow: <SampleNextArrowSmallDiv />,
        // vertical: true,
        // verticalSwiping: true,
        beforeChange: (current, next) => { },
        afterChange: (current) => { },
    };

    const videoTimeUpdate = (e) => {
        const progress = e.currentTarget;
        const player = videoRef.current;
        const percent = e.nativeEvent.offsetX / progress.offsetWidth;
        player.currentTime = percent * player.duration;
    };

    const addTocartClicked2 = useCallback(
        async (skuCode, quantity) => {
            if (dataWs === "0") {
                console.log("Logic running of add to cart for dataws0");
                try {
                    const isAvailable = await getAvailabiityCheck(skuCode);
                    console.log("availability", isAvailable);
                    if (isAvailable.status === "instock") {
                        const event = new CustomEvent("ADDED_TO_CART", {
                            detail: JSON.stringify({
                                type: "SimpleProduct",
                                sku: skuCode,
                                qty: quantityForAddToCart,
                            }),
                        });

                        window.dispatchEvent(event);
                        setTimeout(() => {
                            if (cart?.status === "rejected") {
                                setErrorMessage(`${cart?.message ? cart?.message : "Something went wrong"}`);
                                setIsVisibleMsg(true);
                            } else {
                                setErrorMessage("Item added to Cart");
                                setIsVisibleMsg(true);
                            }
                        }, 500);
                    } else if (isAvailable.status === "outofstock") {
                        setErrorMessage("This item is out of stock");
                        setIsVisibleMsg(true);
                    } else {
                        setErrorMessage("Something went wrong, Please try again!");
                        setIsVisibleMsg(true);
                    }
                } catch (error) {
                    console.error("error", error);
                    setErrorMessage("Something went wrong, Please try again!");
                    setIsVisibleMsg(true);
                }
            } else if (dataWs === "1") {
                console.log("Logic running of add to cart for dataws1");
                try {
                    const addToCartEvent = new CustomEvent('ADDED_TO_CART', {
                        detail: {
                            sku: skuCode,
                            quantity: quantityForAddToCart,
                        },
                    });
                    window.dispatchEvent(addToCartEvent);
                    console.log(addToCartEvent);

                    setErrorMessage("Item added to cart");
                    setIsVisibleMsg(true);
                } catch (error) {
                    console.error("error", error);
                    setErrorMessage("Something went wrong, Please try again!");
                    setIsVisibleMsg(true);
                }
            } else {
                console.log("Logic running of add to cart for no dataws");
                try {
                    const isAvailable = await getAvailabiityCheck(skuCode);
                    if (isAvailable.status === "instock") {
                        const event = new CustomEvent("ADDED_TO_CART", {
                            detail: JSON.stringify({
                                type: "SimpleProduct",
                                sku: skuCode,
                                qty: quantityForAddToCart,
                            }),
                        });

                        window.dispatchEvent(event);
                        setErrorMessage("Item added to cart");
                        setIsVisibleMsg(true);
                    } else if (isAvailable.status === "outofstock") {
                        setErrorMessage("This item is out of stock");
                        setIsVisibleMsg(true);
                    } else {
                        setErrorMessage("Something went wrong, Please try again!");
                        setIsVisibleMsg(true);
                    }
                } catch (error) {
                    console.error("error", error);
                    setErrorMessage("Something went wrong, Please try again!");
                    setIsVisibleMsg(true);
                }
            }
        },
        [
            quantityForAddToCart,
            dataWs,
            setErrorMessage,
            setIsVisibleMsg,
            getAvailabiityCheck,
            cart
        ],
    );

    const addToWatchListClicked2 = (skuCode) => {
        if (dataWs === "0") {
            console.log("Logic running of wishlist for dataws0");
            try {
                const event = new CustomEvent("ADDED_TO_WISHLIST", {
                    detail: JSON.stringify({
                        type: "SimpleProduct",
                        sku: skuCode,
                        selectedOptions: [],
                    }),
                });
                console.log(event);
                window.dispatchEvent(event);

                if (cart?.token) {
                    setErrorMessage("Item added to wishlist");
                    setIsVisibleMsg(true);
                }
                setTimeout(async () => {
                    await getWishlistDetails();
                }, 500);
                // toast.success("Successfully added to watchlist")
            } catch (error) {
                console.error("error", error);

                setErrorMessage("Something went wrong, Please try again!");
                setIsVisibleMsg(true);
            }
        } else if (dataWs === "1") {
            console.log("Logic running of wishlist for dataws1");
            try {
                const event = new CustomEvent("ADDED_TO_WISHLIST", {
                    detail: JSON.stringify({
                        type: "SimpleProduct",
                        sku: skuCode,
                        selectedOptions: [],
                    }),
                });

                window.dispatchEvent(event);

                if (cart?.token) {
                    setErrorMessage("Item added to wishlist");
                    setIsVisibleMsg(true);
                }
                setTimeout(async () => {
                    await getWishlistDetails();
                }, 500);
                // toast.success("Successfully added to watchlist")
            } catch (error) {
                console.error("error", error);

                setErrorMessage("Something went wrong, Please try again!");
                setIsVisibleMsg(true);
            }
        } else {
            console.log("Logic running of wishlist for no dataws");

            try {
                const event = new CustomEvent("ADDED_TO_WISHLIST", {
                    detail: JSON.stringify({
                        type: "SimpleProduct",
                        sku: skuCode,
                        selectedOptions: [],
                    }),
                });

                window.dispatchEvent(event);

                if (cart?.token) {
                    setErrorMessage("Item added to wishlist");
                    setIsVisibleMsg(true);
                }
                setTimeout(async () => {
                    await getWishlistDetails();
                }, 500);
                // toast.success("Successfully added to watchlist")
            } catch (error) {
                console.error("error", error);

                setErrorMessage("Something went wrong, Please try again!");
                setIsVisibleMsg(true);
            }
        }
    };

    const CTAClicksssv = async (dId, pId, vId, cType) => {
        const formData = new FormData();

        formData.append("designer_id", dId);
        formData.append("product_id", pId);
        formData.append("user_id", ""); // Update with your user_id or leave it as an empty string
        formData.append("video_id", vId);
        formData.append("type", cType);

        try {
            await axios.post(
                "https://api.goswirl.live/index.php/shopify/actionbuttons",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
        } catch (error) {
            // Handle the error here
            console.error("SWIRL CTA Track failed!", error);
        }
    };
    // console.log("active === index ", active === index, active, index);
    const this_page_url = window.location.href;
    const checkInWishListOrNo = checkInWishListOrNot(
        wishlistData,
        productData?.sku_code,
    );

    const countPercentage = () => {
        const actualPrice = productData?.price;
        const discountedPrice = productData?.discount_price;

        if (actualPrice > 0 && discountedPrice > 0) {
            const discountPercentage = Math.round(
                ((actualPrice - discountedPrice) / actualPrice) * 100,
            );
            return discountPercentage + "%";
        } else {
            return "Invalid prices";
        }
    };
    return (
        <div
            onMouseEnter={handleHover}
            onTouchStart={handleHover}
            onMouseMove={handleHover}
            // onTouchMove={() => {
            //     showGif = false
            //     localStorage.setItem("gif_preload", false)
            // }}

            onClick={() => {
                handleHover()
                // if (isDrawerOpen) {
                //     setIsDrawerOpen(false)
                // }
            }}
            onMouseLeave={handleMouseLeave}
            style={{
                transition: "opacity 0.6s ease-out",
                width: thisVideo.product.length > 0 ? "50%" : "100%",

            }}
            className="swirl_ssv_column"
        >
            <video
                className="swirl_ssv_video_div"
                ref={videoRef}
                onEnded={handleVideoEnd}
                preload="metadata"
                autoPlay={active === index ? true : false}
                loop
                playsInline
                muted={muted}
            >
                <source src={videoLink} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="swirl_ssv_video_overlay" style={{ willChange: "transform" }}>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            marginLeft: "auto",
                        }}
                    >
                        {swirlSettings.pip_mode === "1" ? (
                            <img
                                onClick={() => handlePlayInPIP(thisVideo)}
                                alt="pip_btn"
                                className="swirl_ssv_close_btn"
                                style={{ zIndex: "9999" }}
                                src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/pip.webp"
                            />
                        ) : (
                            ""
                        )}
                        <img
                            onClick={onClose}
                            alt="close_btn"
                            className="swirl_ssv_close_btn"
                            style={{ zIndex: "9999" }}
                            src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/close.webp"
                        />
                    </div>
                </div>

                <div style={{ position: "absolute", display: showGif && windowWidth < 833 && swirlData?.video?.length > 1 ? "flex" : "none", width: "100%", textAlign: "center", height: "100%", background: "rgba(0,0,0,0.6)", top: "0" }}>
                    <img src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/gif/swipe-up-arrow.gif" className="swirl_ssv_gif_swipe_up" />
                </div>
                <div
                    className="swirl_ssv_play_btn"
                    style={{
                        transition: "opacity 0.4s ease-out",
                        opacity: isVisible ? 0 : 1,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <img
                            className="swirl_ssv_video_forword_ssv"
                            onClick={handleBackward}
                            alt="video forword"
                            src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/rewind.svg"
                        />

                        {isPlaying ? (
                            <img
                                onClick={togglePlayPause}
                                src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/pause.webp"
                                className="swirl_ssv_playpausse_btn_carousel"
                                alt="pause_btn"
                            />
                        ) : (
                            <img
                                onClick={togglePlayPause}
                                className="swirl_ssv_playpausse_btn_carousel"
                                src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/play.webp"
                                alt="pause_btn"
                            />
                        )}
                        <img
                            className="swirl_ssv_video_forword_ssv"
                            onClick={handleForward}
                            alt="video forword"
                            src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn@latest/assets/images/forward.svg"
                        />
                    </div>
                </div>

                <div
                    className="swirl_ssv_bottom_slider"
                    ref={modalRef}
                    style={{
                        height: "250px",
                        padding: "10px",
                        borderRadius: "10px 10px 0px 0px ",
                        position: "relative",
                        backgroundColor: "#fff",
                        zIndex: "10001",
                        transform: `translateY(${isDrawerOpen ? "-250px" : "250px"})`,
                        transition: "transform 0.5s ease",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: "2px solid #eee",
                            marginBottom: "20px",
                            paddingBottom: "8px",
                        }}
                    >
                        <div
                            className="swirl_ssv_arrow_left small_screen_arrow_left"
                            onClick={toggleDrawer}
                            style={{ cursor: "pointer" }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"
                                    fill="rgba(23,23,28,1)"
                                ></path>
                            </svg>
                        </div>
                        <p
                            style={{
                                textAlign: "center",
                                color: "black",
                                margin: "0px 10px 3px 10px ",
                                fontSize: "16px",
                            }}
                        >
                            Ask Questions
                        </p>
                        <div
                            className="swirl_ssv_arrow_left small_screen_arrow_left"
                            style={{
                                visibility: "hidden",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"
                                    fill="rgba(23,23,28,1)"
                                ></path>
                            </svg>
                        </div>
                    </div>

                    <form onSubmit={askQuestionFunction}>
                        <textarea
                            placeholder="Enter query here"
                            className="swirl_ssv_text_area"
                            rows={5}
                            onChange={(e) => setMsg(e.target.value)}
                        />
                        <button
                            className="swirl_ssv_register_btn"
                            style={{
                                opacity: msg?.length > 0 ? 1 : 0.6,
                                backgroundColor: swirlSettings?.bk_color_buy_btn,
                                color: swirlSettings?.front_color_buy_btn,
                            }}
                            id="asq_query_send_btn"
                            disabled={msg?.length > 0 ? false : true}
                        >
                            Send
                        </button>
                    </form>
                </div>
                <div
                    className="swirl_ssv_bottom_slider"
                    ref={shareModalRef}
                    style={{
                        height: "150px",
                        borderRadius: "10px 10px 0px 0px ",
                        position: "relative",
                        backgroundColor: "#fff",
                        zIndex: "10001",
                        transform: `translateY(${shareDrawerOnOrOff ? "-400px" : "400px"})`,
                        transition: "transform 0.5s ease",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderBottom: "1px solid #eee",
                            padding: "3px 10px",
                        }}
                    >
                        <div className="swirl_ssv_arrow_left small_screen_arrow_left" onClick={toggleshareDrawer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"
                                    fill="rgba(23,23,28,1)"
                                ></path>
                            </svg>
                        </div>
                        <p
                            style={{
                                textAlign: "center",
                                color: "black",
                                margin: "0",
                                padding: "5px",
                            }}
                        >
                            Share to
                        </p>
                        <div
                            className="swirl_ssv_arrow_left small_screen_arrow_left"
                            style={{
                                visibility: "hidden",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"
                                    fill="rgba(23,23,28,1)"
                                ></path>
                            </svg>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            display: "grid",
                            placeItems: "center",
                        }}
                    >
                        <div
                            className="swirl_ssv_share_icons"
                            style={{
                                padding: "20px  70px",
                            }}
                        >
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${this_page_url}?swirl_video=${window.btoa(
                                    thisVideo?.video_id,
                                )}`}
                                rel="noreferrer"
                                target="_blank"
                            >
                                <img
                                    className="swirl_ssv_video-modal-share-modal-social-ssv"
                                    src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/facebook.webp"
                                    alt="Facebook icon"
                                    title="Share on Facebook"
                                />
                            </a>
                            <a
                                href={`https://twitter.com/share?url=${this_page_url}?swirl_video=${window.btoa(
                                    thisVideo?.video_id,
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="swirl_ssv_video-modal-share-modal-social-ssv"
                                    src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/twitter.webp"
                                    alt="Twitter icon"
                                    title="Share on Twitter"
                                />
                            </a>
                            <a
                                href={`https://api.whatsapp.com/send?text=${this_page_url}?swirl_video=${window.btoa(
                                    thisVideo?.video_id,
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="swirl_ssv_video-modal-share-modal-social-ssv"
                                    src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/whatsapp.webp"
                                    alt="Whatsapp icon"
                                    title="Share on Whatsapp"
                                />
                            </a>
                            <a href={`mailto:?to=&body=Open this link : ${this_page_url}?swirl_video=${window.btoa(thisVideo?.video_id)}&subject=Please checkout this link, I found something amazing`}>
                                <img
                                    className="swirl_ssv_video-modal-share-modal-social-ssv"
                                    src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/email.webp"
                                    alt="Email icon"
                                    title="Share on Email"
                                    rel="noreferrer"
                                    style={{ cursor: "pointer" }}
                                />
                            </a>
                            <img
                                onClick={() => {
                                    copyToClipboard(
                                        `${this_page_url}?swirl_video=${window.btoa(
                                            thisVideo?.video_id,
                                        )}`,
                                    );
                                    setErrorMessage("Link copied");
                                    setIsVisibleMsg(true);
                                }}
                                className="swirl_ssv_video-modal-share-modal-social-ssv"
                                src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/copy-link.webp"
                                alt="Copy link icon"
                                title="Copy Link"
                                rel="noreferrer"
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        position: "absolute",
                        bottom:
                            windowWidth < 833
                                ? thisVideo?.product?.length === 0
                                    ? 19
                                    : 130
                                : 19,
                        right: 10,
                        padding: "10px 0px",
                        willChange: "transform"
                    }}
                >
                    {swirlSettings.download_icon === 1 ? (
                        <div className="swirl_ssv_right_botttom_icn">
                            <img
                                className="swirl_ssv_right_bottom_icons_carousel"
                                onClick={() => downloadVideo(thisVideo.server_url)}
                                alt="video forword"
                                src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/download.webp"
                            />
                            <p
                                style={{
                                    padding: "0px",
                                    marginTop: "-10px",
                                    textAlign: "center",
                                    marginBottom: "-7px",
                                    fontSize: "7px",
                                }}
                            >
                                Download
                            </p>
                        </div>
                    ) : (
                        ""
                    )}
                    {swirlSettings.ask_question === 1 ? (
                        <div className="swirl_ssv_right_botttom_icn" ref={askbtnref}>
                            <img
                                className="swirl_ssv_right_bottom_icons_carousel"
                                onClick={toggleDrawer}
                                alt="video forword"
                                src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/ask-question.webp"
                            />
                            <p
                                style={{
                                    padding: "0px",
                                    marginTop: "-10px",
                                    textAlign: "center",
                                    marginBottom: "-7px",
                                    fontSize: "7px",
                                }}
                            >
                                Question
                            </p>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="swirl_ssv_right_botttom_icn">
                        <img
                            className="swirl_ssv_right_bottom_icons_carousel mute_icons"
                            onClick={handleToggleMute}
                            style={{ padding: "6px" }}
                            alt="video forword"
                            src={
                                !muted
                                    ? "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-up-fill.webp"
                                    : "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-mute-fill.webp"
                            }
                        />
                        <p
                            style={{
                                padding: "0px",
                                marginTop: "-10px",
                                textAlign: "center",
                                marginBottom: "-7px",
                                fontSize: "7px",
                            }}
                        >
                            {!muted ? "Mute" : "Unmute"}
                        </p>
                    </div>
                    <div className="swirl_ssv_right_botttom_icn" ref={shareBtnRef} style={{ willChange: "transform", }}>
                        <img
                            className="swirl_ssv_right_bottom_icons_carousel share_icon "
                            style={{ padding: "6px" }}
                            onClick={toggleshareDrawer}
                            alt="video forword"
                            src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/share-icon.webp"
                        />
                        <p
                            style={{
                                padding: "0px",
                                marginTop: "-10px",
                                textAlign: "center",
                                marginBottom: "-7px",
                                fontSize: "7px",
                            }}
                        >
                            Share
                        </p>
                    </div>
                </div>
                {/* Register Modal */}
                <div
                    style={{
                        position: "absolute",
                        bottom:
                            windowWidth < 833 && thisVideo.product.length > 0
                                ? "130px"
                                : "30px",
                        width: "100%",
                        cursor: "pointer"
                    }}
                >
                    {/* <input
                        style={{
                            transition: 'opacity 0.4s ease-out',
                            opacity: isVisible ? 0 : 1,
                            display: "flex",
                            flexDirection: "column"
                        }}
                        type="range"
                        min={0}
                        max={duration}
                        step={1}
                        value={currentTime}
                        onChange={handleSliderChange}
                        className='swirl_ssv_custom-slider'
                    /> */}
                    <progress
                        min={0}
                        style={{
                            transition: "opacity 0.4s ease-out",
                            opacity: isVisible ? 0 : 1,
                            display: "flex",
                            flexDirection: "column",
                            height: "4px",
                            border: "0px",
                            maxWidth: "200px",
                            margin: "auto",
                        }}
                        onMouseDown={(e) => videoTimeUpdate(e)}
                        id="swirl_ssv_video_progress"
                        value={currentTime}
                        max={duration}
                    ></progress>
                </div>

                <div
                    ref={registerModalRef}
                    className={`content ${isVisibleModal ? "visible" : "hidden"}`}
                    style={{
                        height: "100%",
                        padding: "15px",
                        width: "100%",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        margin: "auto",
                        zIndex: "10001",
                        backgroundColor: "#00000090",
                    }}
                >
                    <div className="swirl_ssv_box_register">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "25%",
                            }}
                        >
                            <img
                                src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/close.webp"
                                alt="icon"
                                style={{ filter: "invert(1)", visibility: "hidden" }}
                            />
                            <p
                                style={{
                                    margin: 0,
                                    padding: "0",
                                    textAlign: "center",
                                    color: "#000",
                                    fontSize: "17px",
                                }}
                            >
                                Register yourself{" "}
                            </p>
                            <img
                                src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/close.webp"
                                onClick={toggleVisibilityModal}
                                alt="icon"
                                style={{ filter: "invert(1)", cursor: "pointer" }}
                            />
                        </div>
                        <hr />

                        <form className="swirl_ssv_modal_form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                className="swirl_ssv_name_field"
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                required
                            />

                            <div className="swirl_ssv_contact-group">
                                <div
                                    className="swirl_ssv_country-select"
                                    style={{ width: "30%" }}
                                >
                                    <select
                                        id="country"
                                        name="userphonecode"
                                        className="swirl_ssv_country-name"
                                        style={{ width: "100%" }}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="91" defaultValue>
                                            India +91
                                        </option>
                                        <option value="44">United Kingdom +44</option>
                                        <option value="1">United States +1</option>
                                        <option value="92">Pakistan +92</option>
                                        <option value="971">United Arab Emirates +971</option>
                                        <option value="974">Qatar +974</option>
                                        <option value="966">Saudi Arabia +966</option>
                                        <option value="965">Kuwait +965</option>
                                        <option value="968">Oman +968</option>
                                        <option value="967">Yemen +967</option>
                                    </select>
                                </div>
                                <div className="swirl_ssv_phone-input">
                                    <input
                                        type="number"
                                        id="phone"
                                        name="userphone"
                                        className="swirl_ssv_phone"
                                        onChange={handleInputChange}
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                className="swirl_ssv_register_btn"
                                style={{
                                    backgroundColor: swirlSettings?.bk_color_buy_btn,
                                    color: swirlSettings?.front_color_buy_btn,
                                }}
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
                <div
                    className="swirl_ssv_popup"
                    style={{ position: "absolute", top: "20%", width: "100%" }}
                >
                    <ErrorBox
                        swirlSettings={swirlSettings}
                        setIsVisibleMsg={setIsVisibleMsg}
                        isVisibleMsg={isVisibleMsg}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                    />
                </div>

                {thisVideo.product.length > 0 ? (
                    <div
                        ref={productDrawerRef}
                        style={{
                            height: productDetalDrawer ? "100%" : "0px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            backgroundColor: "transparent",
                            zIndex: "10000000",
                            position: "absolute",
                            bottom: "0",
                            left: "0",
                            right: "0",
                            transition: "height 0.6s ease, max-height 0.6s ease",
                        }}
                    >

                        <div style={{ height: "360x", marginTop: "auto", backgroundColor: "rgb(255,255,255)" }} ref={productSectionRefForDrawer}>
                            <div
                                style={{
                                    borderBottom: "1px solid #eee",
                                    padding: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    handleProductDetailDrawer();
                                }}
                            >
                                <img
                                    src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/previous-arrow.webp"
                                    alt="product"
                                    className="swirl_ssv_down_arrow"
                                />
                            </div>
                            <div
                                style={{
                                    height: "auto",
                                    overflow: "auto",
                                    maxHeight: "400px",
                                    overflowX: "auto",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        padding: "10px",
                                        borderBottom: "1px solid #eee",
                                        cursor: swirlSettings?.buy_now === 0 || productData?.url === undefined ? "default" : "pointer"
                                    }}
                                    onClick={() => {
                                        redirectTOPDP(swirlSettings?.buy_now, productData?.url)
                                    }}
                                >
                                    <div className="swirl_col_1" style={{ width: "80px" }}>
                                        <img
                                            src={productData.image}
                                            style={{
                                                border: "1px solid #aaa",
                                            }}
                                            alt="product"
                                            className="swirl_ssv_product_img_ssv swirl_ssv_prduct_on_right"
                                        />
                                    </div>

                                    <div
                                        className="swirl_col_2"
                                        style={{ width: "calc(90% - 80px)", padding: "0px 5px" }}
                                    >
                                        <p
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "15px",
                                                color: "black",
                                                textWrap: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {sliceString(productData.title, 100)}
                                        </p>
                                        {swirlSettings.product_price_status === 1 ? (
                                            <Fragment>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    {productData.discount_price === productData.price ? (
                                                        <p
                                                            style={{
                                                                fontWeight: "bold",
                                                                color: swirlSettings?.mrp_fk_color,
                                                                fontSize: "15px",
                                                                margin: "0",
                                                            }}
                                                        >
                                                            {productData.currencySymbol}
                                                            {productData.price}
                                                        </p>
                                                    ) : (
                                                        <p style={{ margin: "0" }}>
                                                            {" "}
                                                            <span
                                                                style={{
                                                                    fontWeight: "bold",
                                                                    marginRight: "5px",
                                                                    color: swirlSettings?.mrp_fk_color,
                                                                    fontSize: "15px",
                                                                    margin: "0",
                                                                }}
                                                            >
                                                                {productData.currencySymbol}

                                                                {productData.discount_price}
                                                            </span>{" "}
                                                            <del
                                                                style={{
                                                                    fontWeight: "200",
                                                                    color: swirlSettings?.mrp_fk_color,
                                                                    fontSize: "15px",
                                                                    margin: "0",
                                                                }}
                                                            >
                                                                {productData.currencySymbol}
                                                                {productData.price}
                                                            </del>
                                                        </p>
                                                    )}
                                                    {productData.discount_price === productData.price ? (
                                                        <p
                                                            style={{
                                                                textAlign: "center",
                                                                visibility: "hidden",
                                                                fontSize: "15px",
                                                                margin: "0",
                                                            }}
                                                        >
                                                            {countPercentage()} OFF
                                                        </p>
                                                    ) : (
                                                        <span
                                                            className="swirl_ssv_discount_percent_badge "
                                                            id="swirl_ssv_discount_percent_badge_sm"
                                                            style={{
                                                                backgroundColor: swirlSettings?.off_bk_color,
                                                                color: swirlSettings?.off_fk_color,
                                                                fontSize: "13px",
                                                                margin: "0",
                                                            }}
                                                        >
                                                            {countPercentage()} OFF
                                                        </span>
                                                    )}
                                                </div>
                                            </Fragment>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div
                                        className="swirl_col_3 heart_btn"
                                        style={{
                                            width: "10%",
                                            display: "grid",
                                            placeItems: "center",
                                        }}
                                    >
                                        <div
                                            onClick={() => {
                                                // setDescriptionOn(true);
                                                // setDescriptionData(el);
                                                if (checkInWishListOrNo.status) {
                                                    removeFromWatchList(checkInWishListOrNo?.obj?.id);
                                                } else {
                                                    if (cart?.token) {
                                                        addToWatchListClicked2(productData?.sku_code, 1);
                                                    } else {
                                                        onClose();
                                                        addToWatchListClicked2(productData?.sku_code, 1);
                                                    }
                                                }
                                            }}
                                        >
                                            {!checkInWishListOrNo.status ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="28"
                                                    height="28"
                                                    fill="#000"
                                                    viewBox="0 0 256 256"
                                                >
                                                    <rect width="256" height="256" fill="none"></rect>
                                                    <path
                                                        d="M133.7,211.9l81-81c19.9-20,22.8-52.7,4-73.6a52,52,0,0,0-75.5-2.1L128,70.5,114.9,57.3c-20-19.9-52.7-22.8-73.6-4a52,52,0,0,0-2.1,75.5l83.1,83.1A8.1,8.1,0,0,0,133.7,211.9Z"
                                                        fill="none"
                                                        stroke="#000"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="8"
                                                    ></path>
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="28"
                                                    height="28"
                                                    fill="#000"
                                                    viewBox="0 0 256 256"
                                                >
                                                    <rect width="256" height="256" fill="none"></rect>
                                                    <path
                                                        d="M133.7,211.9l81-81c19.9-20,22.8-52.7,4-73.6a52,52,0,0,0-75.5-2.1L128,70.5,114.9,57.3c-20-19.9-52.7-22.8-73.6-4a52,52,0,0,0-2.1,75.5l83.1,83.1A8.1,8.1,0,0,0,133.7,211.9Z"
                                                        fill="red"
                                                        stroke="#000"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="8"
                                                    ></path>
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p
                                        style={{
                                            margin: "0",
                                            color: "#000",
                                            fontWeight: "600",
                                            padding: "10px",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Product Details
                                    </p>
                                    <p
                                        style={{
                                            margin: "0",
                                            color: "#000",
                                            fontSize: "14px",
                                            padding: "10px",
                                        }}
                                    >
                                        {" "}
                                        {productData.desription}
                                    </p>
                                </div>
                                <div
                                    className="swirl_ssv_quantity_section"
                                    style={{
                                        border: "1px solid #eee",
                                        display: "flex",
                                        width: "100%",
                                        alignItems: "center",
                                        margin: "0",
                                        padding: "10px",
                                        alignContent: "space-between",
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: "18px",
                                            color: "#000",
                                            margin: "0",
                                            display: "flex",
                                        }}
                                    >
                                        Choose Quantity
                                    </p>
                                    <div style={{ marginLeft: "auto", display: "flex", marginRight: "10px" }}>
                                        <button
                                            style={{
                                                padding: "10px 20px",
                                                outline: "none",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                            disabled={quantityForAddToCart === 1 ? true : false}
                                            onClick={() =>
                                                handleQuantity("decrease", productData.sku_code)
                                            }
                                        >
                                            -
                                        </button>
                                        <input
                                            className="swirl_ssv_quantity_section_input"
                                            value={quantityForAddToCart}
                                            disabled
                                        />
                                        <button
                                            style={{
                                                padding: "10px 19px",
                                                outline: "none",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                            disabled={quantityForAddToCart === 20 ? true : false}
                                            onClick={() =>
                                                handleQuantity("increase", productData.sku_code)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                {dataWs === "1" && <ReviewCompoNent show={show} height="250px" skuCode={productData?.sku_code} />}

                            </div>
                            <div style={{ padding: "10px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        paddingTop: "1px",
                                        width: "100%",
                                        alignItems: "center",
                                    }}
                                >
                                    {swirlSettings?.add_to_cart === 1 ? (
                                        <button
                                            onClick={() => {
                                                setLoadingbtnId("1");
                                                setLoadingCart(true);
                                                addTocartClicked2(productData?.sku_code, 1);
                                                CTAClicksssv(
                                                    swirlSettings?.brand_id,
                                                    productData.product_id,
                                                    thisVideo?.video_id,
                                                    "2",
                                                );
                                            }}
                                            // className="swirl_ssv_add_to_cart_btn_ssv"
                                            style={{
                                                width: "100%",
                                                color: swirlSettings?.front_color_add_to_cart_btn,
                                                border: `1px solid ${swirlSettings?.bk_color_add_to_cart_btn}`,
                                                borderRadius: "5px",
                                                backgroundColor: swirlSettings?.bk_color_add_to_cart_btn,
                                                fontSize: "15px",
                                                padding: "4px",
                                            }}
                                        >
                                            <CartBtnLoadingComp
                                                preViousText="Adding"
                                                btnId="1"
                                                NextText={swirlSettings?.add_to_cart_btn}
                                                loadingCart={loadingCart}
                                                setLoadingCart={setLoadingCart}
                                                loadingbtnId={loadingbtnId}
                                                setLoadingbtnId={setLoadingbtnId}
                                            />
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                    {swirlSettings?.buy_now === 1 ? (
                                        <button
                                            onClick={() => {
                                                CTAClicksssv(
                                                    swirlSettings?.brand_id,
                                                    productData.product_id,
                                                    thisVideo?.video_id,
                                                    "1",
                                                );

                                                if (dataWs === "1") {
                                                    const addToCartEvent = new CustomEvent('ADDED_TO_CART', {
                                                        detail: {
                                                            sku: productData?.sku_code,
                                                            quantity: quantityForAddToCart,
                                                            buynow: true
                                                        },
                                                    });
                                                    window.dispatchEvent(addToCartEvent);
                                                    enableScrollssv();
                                                } else {
                                                    onClose();
                                                    window.open(productData?.url);
                                                }

                                            }}
                                            style={{
                                                width: "100%",
                                                color: swirlSettings?.front_color_buy_btn,
                                                border: `1px solid ${swirlSettings?.bk_color_buy_btn}`,
                                                backgroundColor: swirlSettings?.bk_color_buy_btn,
                                                borderRadius: "5px",
                                                marginLeft: "3px",
                                                fontSize: "15px",
                                                padding: "4px",
                                            }}
                                        >
                                            {swirlSettings?.buy_btn}
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                    {swirlSettings.add_to_cart === 1 ? (
                                        <div
                                            onClick={() => {
                                                window.open(`/${swirlSettings?.cust_cart_redirection_link}`, "_blank");
                                            }}
                                            style={{
                                                border: "1px solid #aaa",
                                                padding: "3px 5px",
                                                borderRadius: "5px",
                                                margin: "5px",
                                                cursor: "pointer",
                                                backgroundColor: "#fff",
                                            }}
                                        >
                                            <div>
                                                <img
                                                    className="swirl_ssv_cart_img"
                                                    src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/cart-icon.webp"
                                                    height={26}
                                                    alt="cart_icon"
                                                />
                                            </div>
                                            <span
                                                className="swirl_ssv_badge_add_to_cart"
                                                style={{
                                                    backgroundColor: swirlSettings?.bk_color_buy_btn,
                                                    position: "absolute",
                                                    color: swirlSettings?.front_color_buy_btn,
                                                    marginTop: "-45px",
                                                    marginLeft: "18px",
                                                    width: "20px",
                                                    height: "20px",
                                                    textAlign: "center",
                                                    borderRadius: "50%",
                                                    fontSize: "12px",
                                                    display: "grid",
                                                    placeItems: "center",
                                                }}
                                            >
                                                {quantity ? quantity : "0"}
                                            </span>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>) : (
                    ""
                )}
                <div
                    style={{
                        display:
                            windowWidth < 833 && thisVideo.product.length > 0
                                ? "block"
                                : "none",
                    }}
                >
                    <div
                        style={{
                            // padding: "0px 20px",
                            height: "107px",
                            width: "95%",
                            // paddingTop: "12px",
                            padding: "15px",
                            backgroundColor: "rgb(255,255,255,.8)",
                            borderRadius: "10px",
                            position: "absolute",
                            // bottom: "8px",
                            bottom: "15px",
                            willChange: "transform",
                            left: "0",
                            right: "0",
                            // marginLeft: "10px",
                            // marginRight: "30px",
                            margin: "auto",
                        }}
                    >
                        <Slider {...settings3} >
                            {thisVideo?.product?.map((el, index) => {
                                const currencySymbol = new Intl.NumberFormat(undefined, {
                                    style: "currency",
                                    currency: el.currencyname,
                                })
                                    .formatToParts(0)
                                    .find((part) => part.type === "currency").value;
                                return (
                                    <div key={index} >
                                        <div style={{ display: "flex" }} ref={productRef}>
                                            <div
                                                className="swirl_ssv_product_section_col1"
                                                style={{ width: "75px" }}
                                            >
                                                <img
                                                    src={el.image}
                                                    alt="product"
                                                    style={{
                                                        height: "75px",
                                                        width: "75px",
                                                        borderRadius: "8px",
                                                        border: "1px solid #aaa",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        handleProductDetailDrawer();
                                                        setProductData({ ...el, currencySymbol });
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className="swirl_ssv_product_section_col2"
                                                style={{ width: "calc(100% - 75px)" }}
                                            >
                                                <div style={{ padding: "0px 10px", width: "100%" }}>
                                                    <p
                                                        style={{
                                                            margin: "0",

                                                            color: "#323232",
                                                            whiteSpace: "nowrap",
                                                            textAlign: "left",
                                                            textOverflow: "ellipsis",
                                                            overflow: "hidden",
                                                            lineHeight: "21px",
                                                            fontWeight: "700",
                                                            fontSize: "16px",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            handleProductDetailDrawer();
                                                            setProductData({ ...el, currencySymbol });
                                                        }}
                                                    >
                                                        {sliceString(el.title, 100)}
                                                    </p>
                                                    <p
                                                        style={{
                                                            margin: "0",
                                                            fontSize: "12px",
                                                            color: "#323232",
                                                            padding: "1px 0px",
                                                            textAlign: "left",
                                                            display: "flex",
                                                        }}
                                                    >
                                                        {el.discount_price === el.price ? (
                                                            <p
                                                                style={{
                                                                    fontWeight: "bold",
                                                                    color: swirlSettings?.mrp_fk_color,
                                                                    fontSize: "15px",
                                                                    margin: "0",
                                                                }}
                                                            >
                                                                {currencySymbol}
                                                                {el.price}
                                                            </p>
                                                        ) : (
                                                            <p style={{ margin: "0" }}>
                                                                {" "}
                                                                <span
                                                                    style={{
                                                                        fontWeight: "bold",
                                                                        marginRight: "5px",
                                                                        color: swirlSettings?.mrp_fk_color,
                                                                        fontSize: "15px",
                                                                        margin: "0",
                                                                    }}
                                                                >
                                                                    {currencySymbol}
                                                                    {el.discount_price}
                                                                </span>{" "}
                                                                <del
                                                                    style={{
                                                                        fontWeight: "200",
                                                                        color: swirlSettings?.mrp_fk_color,
                                                                        fontSize: "15px",
                                                                        margin: "0",
                                                                    }}
                                                                >
                                                                    {currencySymbol}
                                                                    {el.price}
                                                                </del>
                                                            </p>
                                                        )}
                                                        {el.discount_price === el.price ? (
                                                            <p
                                                                style={{
                                                                    textAlign: "center",
                                                                    visibility: "hidden",
                                                                    fontSize: "15px",
                                                                    margin: "0",
                                                                    marginLeft: "5px",
                                                                }}
                                                            >
                                                                {countPercentage()} OFF
                                                            </p>
                                                        ) : (
                                                            <span
                                                                style={{
                                                                    backgroundColor: swirlSettings?.off_bk_color,
                                                                    color: swirlSettings?.off_fk_color,
                                                                    fontSize: "9px",
                                                                    padding: "4px 3px",
                                                                    borderRadius: "8px",
                                                                    margin: "0 0 2px 5px",
                                                                    marginLeft: "5px",
                                                                }}
                                                            >
                                                                {countPercentage()} OFF
                                                            </span>
                                                        )}
                                                    </p>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            paddingTop: "1px",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        {swirlSettings.add_to_cart === 1 ? (
                                                            <button
                                                                onClick={() => {
                                                                    setLoadingbtnId("2");
                                                                    setLoadingCart(true);
                                                                    addTocartClicked2(el?.sku_code, 1);
                                                                    CTAClicksssv(
                                                                        swirlSettings?.brand_id,
                                                                        el.product_id,
                                                                        thisVideo?.video_id,
                                                                        "2",
                                                                    );
                                                                }}
                                                                className="swirl_ssv_add_to_cart_btn_ssv"
                                                                style={{
                                                                    width: "100%",
                                                                    color:
                                                                        swirlSettings?.front_color_add_to_cart_btn,
                                                                    border: `1px solid ${swirlSettings?.bk_color_add_to_cart_btn}`,
                                                                }}
                                                            >
                                                                <CartBtnLoadingComp
                                                                    preViousText="Adding"
                                                                    btnId="2"
                                                                    NextText={swirlSettings?.add_to_cart_btn}
                                                                    loadingCart={loadingCart}
                                                                    setLoadingCart={setLoadingCart}
                                                                    loadingbtnId={loadingbtnId}
                                                                    setLoadingbtnId={setLoadingbtnId}
                                                                />
                                                            </button>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {swirlSettings.buy_now === 1 ? (
                                                            <button
                                                                onClick={() => {
                                                                    CTAClicksssv(
                                                                        swirlSettings?.brand_id,
                                                                        el.product_id,
                                                                        thisVideo?.video_id,
                                                                        "1",
                                                                    );

                                                                    if (dataWs === "1") {
                                                                        const addToCartEvent = new CustomEvent('ADDED_TO_CART', {
                                                                            detail: {
                                                                                sku: el?.sku_code,
                                                                                quantity: quantityForAddToCart,
                                                                                buynow: true
                                                                            },
                                                                        });
                                                                        window.dispatchEvent(addToCartEvent);
                                                                        enableScrollssv();
                                                                    } else {
                                                                        onClose();
                                                                        window.open(el?.url);
                                                                    }

                                                                }}
                                                                className="swirl_ssv_buy_btn_ssv"
                                                                style={{
                                                                    width: "100%",
                                                                    color: swirlSettings?.front_color_buy_btn,
                                                                    border: `1px solid ${swirlSettings?.bk_color_buy_btn}`,
                                                                    backgroundColor:
                                                                        swirlSettings?.bk_color_buy_btn,
                                                                }}
                                                            >
                                                                {swirlSettings.buy_btn}
                                                            </button>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>

            </div>
        </div>
    );
};

const ProductDescComp = ({
    swirlSettings,
    descriptionData,
    setDescriptionOn,
    el,
    addToWatchListClicked,
    removeFromWatchList,
    video,
    CTAClicksssv,
    addTocartClicked,
    quantityForAddToCart,
    quantity,
    handleQuantity,
    onClose,
    loadingCart,
    setLoadingCart,
    loadingbtnId,
    setLoadingbtnId,
    wishlistData,
    getAvailabiityCheck,
    cart,
    dataWs,
    show
}) => {
    const checkInWishListOrNo = checkInWishListOrNot(
        wishlistData,
        el?.product[0].sku_code,
    );
    const countPercentage = () => {
        const actualPrice = el.product[0].price;
        const discountedPrice = el.product[0].discount_price;

        if (actualPrice > 0 && discountedPrice > 0) {
            const discountPercentage = Math.round(
                ((actualPrice - discountedPrice) / actualPrice) * 100,
            );
            return discountPercentage + "%";
        } else {
            return "Invalid prices";
        }
    };
    return (
        <div
            className="swirl_ssv_right_column_main"
            style={{
                paddingTop: "4px",
                display: "flex",
                flexDirection: "column",
                height: "90vh",
                justifyContent: "space-between",
            }}
        >
            <div
                className="swirl_ssv_product_tile_ssv"
                style={{ flexGrow: 0, display: "flex", alignItems: "center", cursor: swirlSettings.buy_now === 0 || el.product[0].url === undefined ? "default" : "pointer" }}
                onClick={() => {
                    redirectTOPDP(swirlSettings.buy_now, el.product[0].url)
                }}
            >
                <div style={{ width: "75px" }}>
                    <img
                        src={el?.product[0]?.image}
                        alt="product"
                        style={{ border: "1px solid #aaa" }}
                        className="swirl_ssv_product_img_ssv swirl_ssv_prduct_on_right"
                    />
                </div>
                <div
                    className="swirl_ssv_product_info_tile_ssv"
                    style={{ width: "calc(90% - 75px)" }}
                >
                    <div
                        className="swirl_ssv_title_product_desc"
                        style={{
                            textWrap: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {sliceString(el.product[0].title, 200)}
                    </div>
                    {swirlSettings.product_price_status === 1 ? (
                        <div
                            className="swirl_ssv_product_price"
                            style={{ display: "flex" }}
                        >
                            {/* {
                                new Intl.NumberFormat(undefined, {
                                    style: "currency",
                                    currency: el.product[0]?.currencyname,
                                })
                                    .formatToParts(0)
                                    .find((part) => part.type === "currency").value
                            }{el.product[0].price} */}

                            {el.product[0].discount_price === el.product[0].price ? (
                                <p
                                    style={{
                                        fontWeight: "bold",
                                        color: swirlSettings?.mrp_fk_color,
                                        fontSize: "15px",
                                        margin: "0",
                                    }}
                                >
                                    {
                                        new Intl.NumberFormat(undefined, {
                                            style: "currency",
                                            currency: el.product[0]?.currencyname,
                                        })
                                            .formatToParts(0)
                                            .find((part) => part.type === "currency").value
                                    }
                                    {el.product[0].price}
                                </p>
                            ) : (
                                <p style={{ margin: "0" }}>
                                    {" "}
                                    <span
                                        style={{
                                            fontWeight: "bold",
                                            marginRight: "5px",
                                            color: swirlSettings?.mrp_fk_color,
                                            fontSize: "15px",
                                            margin: "0",
                                        }}
                                    >
                                        {
                                            new Intl.NumberFormat(undefined, {
                                                style: "currency",
                                                currency: el.product[0]?.currencyname,
                                            })
                                                .formatToParts(0)
                                                .find((part) => part.type === "currency").value
                                        }
                                        {el.product[0].discount_price}
                                    </span>{" "}
                                    <del
                                        style={{
                                            fontWeight: "200",
                                            color: swirlSettings?.mrp_fk_color,
                                            fontSize: "15px",
                                            margin: "0",
                                        }}
                                    >
                                        {
                                            new Intl.NumberFormat(undefined, {
                                                style: "currency",
                                                currency: el.product[0]?.currencyname,
                                            })
                                                .formatToParts(0)
                                                .find((part) => part.type === "currency").value
                                        }
                                        {el.product[0].price}
                                    </del>
                                </p>
                            )}
                            {el.product[0].discount_price === el.product[0].price ? (
                                <p
                                    style={{
                                        textAlign: "center",
                                        visibility: "hidden",
                                        fontSize: "15px",
                                        margin: "0",
                                    }}
                                >
                                    {countPercentage()} OFF
                                </p>
                            ) : (
                                <span
                                    className="swirl_ssv_discount_percent_badge"
                                    style={{
                                        backgroundColor: swirlSettings?.off_bk_color,
                                        color: swirlSettings?.off_fk_color,
                                        fontSize: "13px",
                                        margin: "0",
                                    }}
                                >
                                    {countPercentage()} OFF
                                </span>
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div
                    style={{
                        marginLeft: "auto",
                        height: "auto",
                        width: "10%",
                        cursor: "pointer",
                    }}
                    title="Add to wishlist"
                    className="swirl_ssv_heart_icon heart_btn "
                    onClick={() => {
                        if (checkInWishListOrNo.status) {
                            removeFromWatchList(checkInWishListOrNo?.obj?.id);
                        } else {
                            if (cart?.token) {
                                addToWatchListClicked(descriptionData?.sku_code, 1);
                            } else {
                                onClose();
                                addToWatchListClicked(descriptionData?.sku_code, 1);
                            }
                        }

                        CTAClicksssv(
                            swirlSettings?.brand_id,
                            descriptionData?.product_id,
                            video?.video_id,
                            "2",
                        );
                    }}
                >
                    {!checkInWishListOrNo.status ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="#000"
                            viewBox="0 0 256 256"
                        >
                            <rect width="256" height="256" fill="none"></rect>
                            <path
                                d="M133.7,211.9l81-81c19.9-20,22.8-52.7,4-73.6a52,52,0,0,0-75.5-2.1L128,70.5,114.9,57.3c-20-19.9-52.7-22.8-73.6-4a52,52,0,0,0-2.1,75.5l83.1,83.1A8.1,8.1,0,0,0,133.7,211.9Z"
                                fill="none"
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="8"
                            ></path>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            fill="#000"
                            viewBox="0 0 256 256"
                        >
                            <rect width="256" height="256" fill="none"></rect>
                            <path
                                d="M133.7,211.9l81-81c19.9-20,22.8-52.7,4-73.6a52,52,0,0,0-75.5-2.1L128,70.5,114.9,57.3c-20-19.9-52.7-22.8-73.6-4a52,52,0,0,0-2.1,75.5l83.1,83.1A8.1,8.1,0,0,0,133.7,211.9Z"
                                fill="red"
                                stroke="#000"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="8"
                            ></path>
                        </svg>
                    )}
                </div>
            </div>

            <div
                className="swirl_ssv_description_product"
                style={{ flexGrow: 2, display: "flex", flexDirection: "column", marginTop: "-30px" }}
            >
                <h3>Product Description</h3>
                <p style={{ marginTop: "-15px" }}>
                    {" "}
                    {sliceString(el.product[0].desription, 250)}
                </p>
                <div
                    className="swirl_ssv_quantity_section"
                    style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        alignContent: "space-between",
                    }}
                >
                    <p style={{ fontWeight: "bold" }}>Choose Quantity</p>
                    <div style={{ marginLeft: "auto", display: "flex", marginRight: "10px" }}>
                        <button
                            style={{
                                padding: "10px 20px",
                                outline: "none",
                                border: "none",
                                cursor: "pointer",
                            }}
                            disabled={quantityForAddToCart === 1 ? true : false}
                            onClick={() =>
                                handleQuantity("decrease", el?.product[0].sku_code)
                            }
                        >
                            -
                        </button>
                        <input
                            className="swirl_ssv_quantity_section_input"
                            disabled
                            value={quantityForAddToCart}
                        />
                        <button
                            style={{
                                padding: "10px 20px",
                                outline: "none",
                                border: "none",
                                cursor: "pointer",
                            }}
                            disabled={quantityForAddToCart === 20 ? true : false}
                            onClick={() =>
                                handleQuantity("increase", el?.product[0].sku_code)
                            }
                        >
                            +
                        </button>
                    </div>
                </div>

                {dataWs === "1" && <ReviewCompoNent show={show} height="320px" skuCode={el.product[0].sku_code} />}

            </div>
            <div style={{ display: "flex", width: "100%", marginBottom: "5px" }}>
                {swirlSettings.add_to_cart === 1 ? (
                    <button
                        onClick={() => {
                            setLoadingbtnId("3");
                            setLoadingCart(true);
                            addTocartClicked(el?.product[0].sku_code, 1);
                            CTAClicksssv(
                                swirlSettings?.brand_id,
                                el?.product[0].product_id,
                                video?.video_id,
                                "2",
                            );
                        }}
                        style={{
                            width: "100%",
                            margin: "5px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            backgroundColor: "#fff",
                            color: swirlSettings?.front_color_add_to_cart_btn,
                            border: `1px solid ${swirlSettings?.bk_color_add_to_cart_btn}`,
                        }}
                    >
                        <CartBtnLoadingComp
                            preViousText="Adding"
                            btnId="3"
                            NextText={swirlSettings?.add_to_cart_btn}
                            loadingCart={loadingCart}
                            setLoadingCart={setLoadingCart}
                            loadingbtnId={loadingbtnId}
                            setLoadingbtnId={setLoadingbtnId}
                        />
                    </button>
                ) : (
                    ""
                )}
                {swirlSettings.buy_now === 1 ? (
                    <button
                        onClick={() => {
                            CTAClicksssv(
                                swirlSettings?.brand_id,
                                el?.product[0].product_id,
                                video?.video_id,
                                "1",
                            );

                            if (dataWs === "1") {
                                const addToCartEvent = new CustomEvent('ADDED_TO_CART', {
                                    detail: {
                                        sku: el?.product[0]?.sku_code,
                                        quantity: quantityForAddToCart,
                                        buynow: true
                                    },
                                });
                                window.dispatchEvent(addToCartEvent);
                                enableScrollssv();
                            } else {
                                onClose();
                                window.open(el?.product[0]?.url);
                            }

                        }}
                        style={{
                            width: "100%",
                            margin: "5px",
                            borderRadius: "5px",
                            cursor: "pointer",
                            color: swirlSettings?.front_color_buy_btn,
                            border: `1px solid ${swirlSettings?.bk_color_buy_btn}`,
                            backgroundColor: swirlSettings?.bk_color_buy_btn,
                            padding: "10px",
                        }}
                    >
                        {swirlSettings?.buy_btn}
                    </button>
                ) : (
                    ""
                )}
                <div
                    title="Add to Watchlist"
                    onClick={() => {
                        if (checkInWishListOrNo.status) {
                            removeFromWatchList(checkInWishListOrNo?.obj?.id);
                        } else {
                            if (cart?.token) {
                                addToWatchListClicked(el?.sku_code, 1);
                            } else {
                                onClose();
                                addToWatchListClicked(el?.sku_code, 1);
                            }
                        }

                        CTAClicksssv(
                            swirlSettings?.brand_id,
                            el?.product[0].product_id,
                            video?.video_id,
                            "2",
                        );
                    }}
                    style={{
                        border: "1px solid #aaa",
                        padding: "5px 8px",
                        borderRadius: "5px",
                        margin: "5px",
                        cursor: "pointer",
                        backgroundColor: "#fff",
                        display: "none",
                    }}
                >
                    <div>
                        <img
                            alt="Playlist"
                            width="32"
                            height="32"
                            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/playlist-1654818-1407587.png?f=webp"
                        />
                    </div>
                    {/* <span className='badge_add_to_cart' style={{ backgroundColor: swirlSettings?.bk_color_buy_btn, position: 'absolute', color: swirlSettings?.front_color_buy_btn, marginTop: "-45px", marginLeft: "18px", width: "20px", height: "20px", textAlign: "center", borderRadius: "50%", fontSize: "12px", display: "grid", placeItems: "center" }}>1</span> */}
                </div>
                {swirlSettings.add_to_cart === 1 ? (
                    <div
                        onClick={() => {
                            onClose();
                            window.open(`/${swirlSettings?.cust_cart_redirection_link}`, "_blank");
                        }}
                        style={{
                            border: "1px solid #aaa",
                            padding: "5px 8px",
                            borderRadius: "5px",
                            margin: "5px",
                            cursor: "pointer",
                            backgroundColor: "#fff",
                        }}
                    >
                        <div>
                            <img
                                className="swirl_ssv_cart_img"
                                src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/cart-icon.webp"
                                height={26}
                                alt="cart_icon"
                            />
                        </div>
                        <span
                            className="swirl_ssv_badge_add_to_cart"
                            style={{
                                backgroundColor: swirlSettings?.bk_color_buy_btn,
                                position: "absolute",
                                color: swirlSettings?.front_color_buy_btn,
                                marginTop: "-45px",
                                marginLeft: "18px",
                                width: "20px",
                                height: "20px",
                                textAlign: "center",
                                borderRadius: "50%",
                                fontSize: "12px",
                                display: "grid",
                                placeItems: "center",
                            }}
                        >
                            {quantity ? quantity : "0"}
                        </span>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div >
    );
};

const PipComp = ({
    pipDisPlay,
    setPipDisplay,
    videoData,
    handleClick,
    index,
}) => {
    const [muted, setMuted] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    // Create a ref for the video element
    const videoRef = useRef(null);
    useEffect(() => {
        // Check if the video is not playing
        if (videoRef.current && videoRef.current.paused && pipDisPlay) {
            // If not playing, call the play function
            videoRef.current?.play();
        }
    }, [videoRef, pipDisPlay]);

    const handleMuteUnmute = () => {
        const video = videoRef.current;

        if (video) {
            video.muted = !muted;
            setMuted((prevState) => !prevState);
        }
    };

    const togglePlayPause = () => {
        const video = videoRef?.current;

        if (video) {
            if (isPlaying) {
                video?.pause();
            } else {
                video?.play();
            }

            setIsPlaying(!isPlaying);
        }
    };

    const showPipControls = () => {
        // Show the controls
        setShowControls(true);

        // Hide the controls after 3000 milliseconds (3 seconds)
        setTimeout(() => {
            setShowControls(false);
        }, 3000);
    };

    return (
        <div id="pip-container">
            <div
                className="video-pip-ssv"
                style={{ display: "block" }}
                onMouseEnter={showPipControls}
                onMouseLeave={() => setShowControls(false)}
            >
                <video
                    ref={videoRef}
                    preload="metadata"
                    loop
                    playsInline
                    onmouseover="showPipControls();"
                    autoPlay
                    id="swirl_ssv_pip_video"
                    poster={videoData?.cover_image}
                    muted
                >
                    <source src={videoData?.server_url} type="video/mp4" />
                </video>

                <button
                    className="video-pip-playpause-ssv"
                    title="Play/Pause"
                    onClick={togglePlayPause}
                    onMouseEnter={showPipControls}
                    style={{
                        opacity: showControls ? 1 : 0,
                        transition: "opacity 0.5s ease", // Adjust the duration and timing function as needed
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        padding: "10px",
                        borderRadius: "5px",
                        background: "rgb(0, 0, 0, .6) !important",
                    }}
                >
                    <img
                        src={
                            isPlaying
                                ? "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/pause.webp"
                                : "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/play.webp"
                        }
                        alt="Play/Pause icon"
                    />
                </button>
                <button
                    className="video-pip-volume-ssv pfs-ex-ssv"
                    title="Mute/Unmute"
                    onClick={handleMuteUnmute}
                    style={{ background: "rgb(0, 0, 0, .6) !important" }}
                >
                    <img
                        className="pfs-ex-ssv"
                        src={
                            muted
                                ? "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-mute-fill.webp"
                                : "https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/volume-up-fill.webp"
                        }
                        alt="Volume icon"
                    />
                </button>
                <button
                    className="video-pip-close-ssv pfs-ex-ssv"
                    title="Close"
                    onClick={() => {
                        setPipDisplay(false);
                        localStorage.removeItem("_pip_video_data");
                    }}
                    style={{ background: "rgb(0, 0, 0, .6) !important" }}
                >
                    <img
                        className="pfs-ex-ssv"
                        src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/close.webp"
                        alt="Close icon"
                    />
                </button>
                <button
                    onClick={() => handleClick(index)}
                    className="video-pip-fullscreen-ssv"
                    title="Full Screen"
                    style={{ border: "2.5px solid #fff !important" }}
                ></button>
            </div>
        </div>
    );
};

const SwirlShortVideos = ({
    dataCode = "rpdcoi4h",
    dataPlalistCode = "srdPFf",
    url,
    dataWs,
    cart,
    serverType = "development",
}) => {

    const [show, setShow] = useState(false);
    const [active, setActive] = useState(0);
    const [descriptionOn, setDescriptionOn] = useState(false);
    const [swirlData, setSwirlData] = useState([]);
    const [descriptionData, setDescriptionData] = useState({});
    const [quantity, setQueantity] = useState(0);
    const [quantityForAddToCart, setQantityForAddToCart] = useState(1);
    const [pipDisPlay, setPipDisplay] = useState(false);
    const [isVisibleMsg, setIsVisibleMsg] = useState(false);
    const [errorMessage, setErrorMessage] = useState(
        "Something went wrong, Please try again!",
    );
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [loadingCart, setLoadingCart] = useState(false);
    const [swipeStatus, setSwipeStatus] = useState(true);
    // const [wishlistItems, setWishlistItems] = useState([]);
    // const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [loadingbtnId, setLoadingbtnId] = useState(null);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [wishlistData, setWiishlistData] = useState([]);
    const [productStockData, setProductStockData] = useState([])
    const [showGif, setShowGif] = useState(false)
    const state = localStorage.getItem("gif_preload")
    const checkInWishListOrNo = checkInWishListOrNot(
        wishlistData,
        descriptionData?.sku_code,
    );
    const sliderRef = useRef(null);

    const handleNextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };
    const handlePreviousSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
    const handleClick = useCallback(
        (index) => {
            setActive(index);
            setTimeout(() => {
                setShow(true);
            }, 100);

            setPipDisplay(false);
            localStorage.removeItem("_pip_video_data");
            disableScrollssv();
            // const queryString = window.location.search;
            // const queryParams = new URLSearchParams(queryString);
            // const swirlVideoParam = queryParams.get('swirl_video');

            // if (!swirlVideoParam) {
            //     var element = document.documentElement;

            //     if (!swirlVideoParam && windowWidth < 833) {
            //         if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            //             if (element.requestFullscreen) {
            //                 element.requestFullscreen();
            //             } else if (element.mozRequestFullScreen) {
            //                 element.mozRequestFullScreen();
            //             } else if (element.webkitRequestFullscreen) {
            //                 element.webkitRequestFullscreen();
            //             } else if (element.msRequestFullscreen) {
            //                 element.msRequestFullscreen();
            //             } else if (element.webkitEnterFullscreen) { /* iOS Safari */
            //                 element.webkitEnterFullscreen();
            //             }
            //         }
            //     }
            // }
        },
        [setActive, setShow, setPipDisplay],
    );

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(active)
        }
    }, [active])

    const getDataFunc = useCallback(async () => {
        try {
            await axios
                .get(
                    `https://api.goswirl.live/index.php/ShortVideo/videolistingV5?user=${dataCode}&playlist=${dataPlalistCode}&url=${url}`,
                )
                .then((res) => {
                    const data = res?.data?.swilrs;
                    if (data) {
                        setSwirlData(data);
                        setTimeout(() => {
                            // Get the query string from window.location.search
                            const queryString = window.location.search;
                            // Parse the query string into a URLSearchParams object
                            const queryParams = new URLSearchParams(queryString);

                            // Access the value of the 'swirl_video' parameter
                            const swirlVideoParam = queryParams.get("swirl_video");

                            const findIndexByVideoId = (videoId) =>
                                data?.video?.findIndex((obj) => obj.video_id === videoId);
                            const decodedID = window.atob(swirlVideoParam);
                            const ind = findIndexByVideoId(`${decodedID}`);
                            if (swirlVideoParam) {
                                const scrollToElementById = (id) => {
                                    const element = document.getElementById(id);
                                    if (element) {
                                        element.scrollIntoView({ behavior: "smooth" });
                                    }
                                };

                                scrollToElementById("swirl_section_main_div");
                                // console.log(document.getElementById("swil_ssv_modal_div"));
                                handleClick(ind);
                                const url = new URL(window.location.href);
                                url.searchParams.delete("swirl_video");

                                // Replace the current URL with the updated URL
                                window.history.replaceState({}, document.title, url.toString());
                                // if (document && !document.fullscreenElement) {
                                //     document.requestFullscreen();
                                // }
                            }
                        }, 500);
                    }
                });


            if (state === null) {
                setShowGif(true)
            } else {
                setShowGif(false)
            }

        } catch (error) {
            console.log(error);
        }
    }, [dataCode, dataPlalistCode, url, handleClick]);

    const settings = {
        dots: false,
        slidesToShow:
            windowWidth < 576
                ? 2
                : windowWidth < 800
                    ? 3
                    : windowWidth < 1300
                        ? 4
                        : 5,
        slidesToScroll: 1,
        infinite: false,
        initialSlide: 0,
        adaptiveHeight: true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        // responsive: [
        //     {
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 3,
        //             slidesToScroll: 1,
        //         }
        //     },
        //     {
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 1,
        //         }
        //     },
        //     {
        //         breakpoint: 400,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1,
        //         }
        //     }

        // ]
    };
    const playNextSlideAndPausePrevious = (current, next) => {
        const videos = document.getElementsByClassName("swirl_ssv_video_div");
        const thisVideo = videos[next];
        const previosVideo = videos[current];

        // Check if the current video is playing, then pause it
        if (thisVideo && !thisVideo.paused) {
            thisVideo.pause();
        } else {
            // If the current video is paused, play it
            if (thisVideo) {
                thisVideo?.play();
            }
        }

        // Check if the previous video is playing, then pause it
        if (previosVideo && !previosVideo.paused) {
            previosVideo?.pause();
        } else {
            // If the previous video is paused, play it
            if (previosVideo) {
                previosVideo?.play();
            }
        }
    };

    const settings2 = {
        swipe: swipeStatus,
        dots: false,
        slidesToShow: 1,
        speed: !show ? 0 : 600,
        slidesToScroll: 1,
        infinite: false,
        initialSlide: active,
        touchMove: true,
        fade: !show ? true : false,
        autoPlay: false,
        adaptiveHeight: true,
        prevArrow: <SamplePrevArrowForModal />,
        nextArrow: <SampleNextArrowForModal />,
        vertical: windowWidth > 833 ? false : true,
        verticalSwiping: windowWidth > 833 ? false : true,
        // vertical: true,
        // verticalSwiping: true,
        beforeChange: (current, next) => {
            playNextSlideAndPausePrevious(current, next);

            setDescriptionOn(false);

            if (sliderRef.current) {
                sliderRef.current.slickPause();
            }


        },
        onSwipe: () => {
            localStorage.setItem("gif_preload", false)
            setShowGif(false)
        },
        afterChange: (current) => {
            // playNextSlideAndPausePrevious(index)
            setQantityForAddToCart(1);
            if (sliderRef.current) {
                sliderRef.current.slickPause();
            }
        },
    };

    // Event handler to update window width in the state
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    // Effect to add and remove the resize event listener
    useEffect(() => {
        // Add event listener on mount
        window.addEventListener("resize", handleResize);

        // Remove event listener on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty dependency array means the effect runs only on mount and unmount

    // useEffect(() => {
    //     setWindowWidth("100px")
    // }, [])

    const onClose = () => {
        setShow(false);
        enableScrollssv();
        setDescriptionOn(false);
        setQantityForAddToCart(1)
    };

    useEffect(() => {
        getDataFunc();
        localStorage.removeItem("_pip_video_data");
    }, [getDataFunc, windowWidth]);
    const swirlSettings = swirlData?.data;

    const getAvailabiityCheck = useCallback(
        async (skuCode) => {
            if (dataWs === "0") {
                const graphqlEndpoint =
                    serverType === "production"
                        ? "https://mcprod.glamourbook.com/graphql"
                        : "https://mcstaging.glamourbook.com/graphql";

                // GraphQL query
                const graphqlQuery = `
            {
                products(filter: {sku: {eq: "${skuCode}" } }) {
                items {
                sku
                  product_quatity
            stock_status
                }
              }
            }
            `;

                // Fetch options
                const fetchOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Add any additional headers if required
                    },
                    body: JSON.stringify({ query: graphqlQuery }),
                };

                try {
                    // Execute the fetch
                    const response = await fetch(graphqlEndpoint, fetchOptions);
                    const data = await response.json();
                    const items = data.data.products.items;
                    // Handle the response data
                    if (items.length > 0) {
                        const status = items[0].stock_status;
                        const availabilityQuant = items[0].product_quatity;

                        return status === "OUT_OF_STOCK"
                            ? { status: "outofstock", availableQuantity: availabilityQuant }
                            : { status: "instock", availableQuantity: availabilityQuant };
                    } else {
                        return "outofstock";
                    }
                } catch (error) {
                    // Handle errors
                    console.error(error);
                    return "wrong";
                }
            }
        },
        [dataWs, serverType],
    );

    const getWishlistDetails = useCallback(async () => {
        if (dataWs === "0") {
            try {
                if (cart?.token) {
                    const graphqlEndpoint =
                        serverType === "production"
                            ? "https://mcprod.glamourbook.com/graphql"
                            : "https://mcstaging.glamourbook.com/graphql";
                    const graphqlQuery = `
            query GetAllWishlist($currentPage: Int!, $pageSize: Int!) {
                customer {
                wishlists {
                id
                            __typename
            items_count
            items_v2(currentPage: $currentPage, pageSize: $pageSize) {
                items {
                id
                                product {
                uid
                                  sku
                                }
                              }
                            }
                          }
                        }
                      }
            `;
                    const requestOptions = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: cart?.token ? `Bearer ${cart?.token}` : " ",
                        },
                        body: JSON.stringify({
                            query: graphqlQuery,
                            variables: {
                                currentPage: 1,
                                pageSize: 50,
                            },
                        }),
                    };

                    const wishlistResults = await fetch(graphqlEndpoint, requestOptions);
                    const data = await wishlistResults.json();
                    if (data) {
                        if (data?.data?.customer?.wishlists) {
                            setWiishlistData(
                                data?.data?.customer?.wishlists[0].items_v2.items,
                            );
                        }
                    }

                    // console.log(data?.data?.customer?.wishlists[0].items_v2.items);
                }
                // This function returns all wishlist items with their products uid & sku
                // return data.customer.wishlists.items_v2;
            } catch (error) {
                console.error(error);
            }
        } else if (dataWs === "1") {
            try {
                if (cart?.token) {
                    const graphqlEndpoint =
                        serverType === "production"
                            ? "https://mcprod.glamourbook.com/graphql"
                            : "https://mcstaging.glamourbook.com/graphql";
                    const graphqlQuery = `
            query GetAllWishlist($currentPage: Int!, $pageSize: Int!) {
                customer {
                wishlists {
                id
                            __typename
            items_count
            items_v2(currentPage: $currentPage, pageSize: $pageSize) {
                items {
                id
                                product {
                uid
                                  sku
                                }
                              }
                            }
                          }
                        }
                      }
            `;
                    const requestOptions = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: cart?.token ? `Bearer ${cart?.token}` : " ",
                        },
                        body: JSON.stringify({
                            query: graphqlQuery,
                            variables: {
                                currentPage: 1,
                                pageSize: 50,
                            },
                        }),
                    };

                    const wishlistResults = await fetch(graphqlEndpoint, requestOptions);
                    const data = await wishlistResults.json();
                    if (data) {
                        if (data?.data?.customer?.wishlists) {
                            setWiishlistData(
                                data?.data?.customer?.wishlists[0].items_v2.items,
                            );
                        }
                    }

                    // console.log(data?.data?.customer?.wishlists[0].items_v2.items);
                }
                // This function returns all wishlist items with their products uid & sku
                // return data.customer.wishlists.items_v2;
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                if (cart?.token) {
                    const graphqlEndpoint =
                        serverType === "production"
                            ? "https://mcprod.glamourbook.com/graphql"
                            : "https://mcstaging.glamourbook.com/graphql";

                    const graphqlQuery = `
            query GetAllWishlist($currentPage: Int!, $pageSize: Int!) {
                customer {
                wishlists {
                id
                                __typename
            items_count
            items_v2(currentPage: $currentPage, pageSize: $pageSize) {
                items {
                id
                                    product {
                uid
                                      sku
                                    }
                                  }
                                }
                              }
                            }
                          }
            `;
                    const requestOptions = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            authorization: cart?.token ? `Bearer ${cart?.token}` : " ",
                        },
                        body: JSON.stringify({
                            query: graphqlQuery,
                            variables: {
                                currentPage: 1,
                                pageSize: 50,
                            },
                        }),
                    };

                    const wishlistResults = await fetch(graphqlEndpoint, requestOptions);
                    const data = await wishlistResults.json();
                    if (data) {
                        if (data?.data?.customer?.wishlists) {
                            setWiishlistData(
                                data?.data?.customer?.wishlists[0].items_v2.items,
                            );
                        }
                    }

                    // console.log(data?.data?.customer?.wishlists[0].items_v2.items);
                }
                // This function returns all wishlist items with their products uid & sku
                // return data.customer.wishlists.items_v2;
            } catch (error) {
                console.error(error);
            }
        }
    }, [cart?.token, dataWs, serverType]);

    const addTocartClicked = useCallback(
        async (skuCode, quantity) => {
            if (dataWs === "0") {
                console.log("running for 0");
                try {
                    const isAvailable = await getAvailabiityCheck(skuCode);
                    console.log("availability", isAvailable);
                    if (isAvailable.status === "instock") {
                        const event = new CustomEvent("ADDED_TO_CART", {
                            detail: JSON.stringify({
                                type: "SimpleProduct",
                                sku: skuCode,
                                qty: quantityForAddToCart,
                            }),
                        });

                        window.dispatchEvent(event);
                        setTimeout(() => {
                            if (cart?.status === "rejected") {
                                setErrorMessage(`${cart?.message ? cart?.message : "Something went wrong, Please try again!"}`);
                                setIsVisibleMsg(true);
                            } else {
                                setErrorMessage("Item added to Cart");
                                setIsVisibleMsg(true);
                            }
                        }, 500);

                    } else if (isAvailable.status === "outofstock") {
                        setErrorMessage("This item is out of stock");
                        setIsVisibleMsg(true);
                    } else {
                        setErrorMessage("Something went wrong, Please try again!");
                        setIsVisibleMsg(true);
                    }
                } catch (error) {
                    console.error("error", error);
                    setErrorMessage("Something went wrong, Please try again!");
                    setIsVisibleMsg(true);
                }
            } else if (dataWs === "1") {
                console.log("Logic running of add to cart for dataws1");
                // const cartId = "PV3M02Hrfd0awhJNzrjQhQOYvmbuqbk7"
                try {
                    console.log("skuCode", skuCode);
                    console.log("quantity", quantityForAddToCart);

                    const addToCartEvent = new CustomEvent('ADDED_TO_CART', {
                        detail: {
                            sku: skuCode,
                            quantity: quantityForAddToCart,
                        },
                    });
                    window.dispatchEvent(addToCartEvent);
                    console.log(addToCartEvent);

                    setErrorMessage("Item added to cart");
                    setIsVisibleMsg(true);
                } catch (error) {
                    console.error("error", error);
                    setErrorMessage("Something went wrong, Please try again!");
                    setIsVisibleMsg(true);
                }
            } else {
                console.log("Logic running of add to cart for no dataws");
                try {
                    const isAvailable = await getAvailabiityCheck(skuCode);
                    if (isAvailable.status === "instock") {
                        const event = new CustomEvent("ADDED_TO_CART", {
                            detail: JSON.stringify({
                                type: "SimpleProduct",
                                sku: skuCode,
                                qty: quantityForAddToCart,
                            }),
                        });

                        window.dispatchEvent(event);
                        setErrorMessage("Item added to Cart");
                        setIsVisibleMsg(true);
                    } else if (isAvailable.status === "outofstock") {
                        setErrorMessage("This item is out of stock");
                        setIsVisibleMsg(true);
                    } else {
                        setErrorMessage("Something went wrong, Please try again!");
                        setIsVisibleMsg(true);
                    }
                } catch (error) {
                    console.error("error", error);
                    setErrorMessage("Something went wrong, Please try again!");
                    setIsVisibleMsg(true);
                }
            }
        },
        [quantityForAddToCart, dataWs, getAvailabiityCheck, cart],
    );

    useEffect(() => {
        const firstLoadFunc = async () => {
            // await getCartDetails();
            await getWishlistDetails();
        };
        firstLoadFunc();
    }, [addTocartClicked, getWishlistDetails]);
    // const removeFromWishList = (itemID) => {
    //     try {

    //         const event = new CustomEvent("REMOVE_FROM_WISHLIST", {
    //             detail: {data: itemID }
    //         });

    //         window.dispatchEvent(event);

    //     } catch (error) {

    //     }
    // }

    const removeFromWatchList = (itemId) => {
        if (dataWs === "0") {
            console.log("Logic running of remove wishlist for dataws 0");
            try {
                const event = new CustomEvent("REMOVED_FROM_WISHLIST", {
                    detail: itemId,
                });
                console.log(event);
                window.dispatchEvent(event);
                setErrorMessage("Item removed from wishlist");
                setIsVisibleMsg(true);
                setTimeout(async () => {
                    await getWishlistDetails();
                }, 500);
                // toast.success("Successfully added to watchlist")
            } catch (error) {
                console.error("error", error);

                setErrorMessage("Something went wrong, Please try again!");
                setIsVisibleMsg(true);
            }
        } else if (dataWs === "1") {
            console.log("Logic running of remove wishlist for dataws 0");
            try {
                const event = new CustomEvent("REMOVED_FROM_WISHLIST", {
                    detail: itemId,
                });

                window.dispatchEvent(event);
                setErrorMessage("Item removed from wishlist");
                setIsVisibleMsg(true);
                setTimeout(async () => {
                    await getWishlistDetails();
                }, 500);
                // toast.success("Successfully added to watchlist")
            } catch (error) {
                console.error("error", error);

                setErrorMessage("Something went wrong, Please try again!");
                setIsVisibleMsg(true);
            }
        } else {
            console.log("Logic running of remove wishlist for dataws 0");
            try {
                const event = new CustomEvent("REMOVED_FROM_WISHLIST", {
                    detail: itemId,
                });

                window.dispatchEvent(event);
                setErrorMessage("Item removed from wishlist");
                setIsVisibleMsg(true);
                setTimeout(async () => {
                    await getWishlistDetails();
                }, 500);
                // toast.success("Successfully added to watchlist")
            } catch (error) {
                console.error("error", error);

                setErrorMessage("Something went wrong, Please try again!");
                setIsVisibleMsg(true);
            }
        }
    };
    const addToWatchListClicked = (skuCode) => {
        if (dataWs === "0") {
            console.log("Logic running of wishlist for dataws 0");
            try {
                const event = new CustomEvent("ADDED_TO_WISHLIST", {
                    detail: JSON.stringify({
                        type: "SimpleProduct",
                        sku: skuCode,
                        selectedOptions: [],
                    }),
                });
                console.log(event);
                window.dispatchEvent(event);
                if (cart?.token) {
                    setErrorMessage("Item added to wishlist");
                    setIsVisibleMsg(true);
                }
                setTimeout(async () => {
                    await getWishlistDetails();
                }, 500);
                // toast.success("Successfully added to watchlist")
            } catch (error) {
                console.error("error", error);

                setErrorMessage("Something went wrong, Please try again!");
                setIsVisibleMsg(true);
            }
        } else if (dataWs === "1") {
            console.log("Logic running of wishlist for dataws1");
            try {
                const event = new CustomEvent("ADDED_TO_WISHLIST", {
                    detail: JSON.stringify({
                        type: "SimpleProduct",
                        sku: skuCode,
                        selectedOptions: [],
                    }),
                });

                window.dispatchEvent(event);
                if (cart?.token) {
                    setErrorMessage("Item added to wishlist");
                    setIsVisibleMsg(true);
                }

                setTimeout(async () => {
                    await getWishlistDetails();
                }, 500);
                // toast.success("Successfully added to watchlist")
            } catch (error) {
                console.error("error", error);

                setErrorMessage("Something went wrong, Please try again!");
                setIsVisibleMsg(true);
            }
        } else {
            console.log("Logic running of wishlist for no dataws");

            try {
                const event = new CustomEvent("ADDED_TO_WISHLIST", {
                    detail: JSON.stringify({
                        type: "SimpleProduct",
                        sku: skuCode,
                        selectedOptions: [],
                    }),
                });

                window.dispatchEvent(event);
                if (cart?.token) {
                    setErrorMessage("Item added to wishlist");
                    setIsVisibleMsg(true);
                }

                setTimeout(async () => {
                    await getWishlistDetails();
                }, 500);
                // toast.success("Successfully added to watchlist")
            } catch (error) {
                console.error("error", error);

                setErrorMessage("Something went wrong, Please try again!");
                setIsVisibleMsg(true);
            }
        }
    };

    const CTAClicksssv = async (dId, pId, vId, cType) => {
        const formData = new FormData();

        formData.append("designer_id", dId);
        formData.append("product_id", pId);
        formData.append("user_id", ""); // Update with your user_id or leave it as an empty string
        formData.append("video_id", vId);
        formData.append("type", cType);

        try {
            await axios.post(
                "https://api.goswirl.live/index.php/shopify/actionbuttons",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
        } catch (error) {
            // Handle the error here
            console.error("SWIRL CTA Track failed!", error);
        } finally {
            // Code to run regardless of success or failure
        }
    };

    // const handleTouch = (e) => {
    //     e.stopPropagation()
    // }
    useEffect(() => {
        // Function to update window dimensions
        const updateWindowDimensions = () => {
            // setInnerWidth(window.innerWidth);
            setInnerHeight(window.innerHeight);
        };

        // Add event listener to update dimensions when window is resized
        window.addEventListener("resize", updateWindowDimensions);

        // Initial update of dimensions
        updateWindowDimensions();

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        };
    }, []);

    useEffect(() => {
        setQueantity(cart?.cartCount);
    }, [cart?.cartCount]);

    const countPercentage = (el) => {
        const actualPrice = el.price;
        const discountedPrice = el.discount_price;

        if (actualPrice > 0 && discountedPrice > 0) {
            const discountPercentage = Math.round(
                ((actualPrice - discountedPrice) / actualPrice) * 100,
            );
            return discountPercentage + "%";
        } else {
            return "Invalid prices";
        }
    };

    const getAllProductsStockCount = useCallback(async () => {
        const allData = swirlData.video;

        function collectUniqueSkuCodes(data) {
            let uniqueSkuCodes = [];

            data &&
                data?.forEach((item) => {
                    if (item.product && item.product.length > 0) {
                        item.product.forEach((product) => {
                            if (!uniqueSkuCodes.includes(product.sku_code)) {
                                uniqueSkuCodes.push(product.sku_code);
                            }
                        });
                    }
                });

            return uniqueSkuCodes;
        }

        const allSkucodes = collectUniqueSkuCodes(allData);

        if (allSkucodes.length > 0) {
            if (dataWs === "0") {
                const graphqlEndpoint =
                    serverType === "production"
                        ? "https://mcprod.glamourbook.com/graphql"
                        : "https://mcstaging.glamourbook.com/graphql";

                const graphqlQuery = `
            {
                products(filter: {sku: { in: [${allSkucodes
                        .map((code) => `"${code}"`)
                        .join(", ")}] } }) {
                items {
                sku
                  product_quatity
            stock_status
                }
              }
            }
            `;

                const fetchOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query: graphqlQuery }),
                };

                try {
                    const response = await fetch(graphqlEndpoint, fetchOptions);
                    const data = await response.json();
                    const allStockData = data.data.products.items;
                    setProductStockData(allStockData);
                } catch (error) {
                    console.error(error);
                    // Handle errors or return an appropriate value
                }
            }
        }
    }, [dataWs, serverType, swirlData]);

    useEffect(() => {
        getAllProductsStockCount();
    }, [getAllProductsStockCount]);

    const checkProductStock = useCallback(
        (skuCode) => {
            const stockData = productStockData;

            if (stockData.length > 0) {
                const matchingObj = stockData.find(
                    (product) => product.sku === skuCode,
                );
                console.log(matchingObj);

                if (matchingObj?.stock_status === "IN_STOCK") {
                    return {
                        status: "instock",
                        quantity: matchingObj?.product_quatity,
                    };
                } else {
                    return {
                        status: "outofstock",
                        quantity: matchingObj?.product_quatity,
                    };
                }
            }
        },
        [productStockData],
    );

    const handleQuantity = (method) => {
        if (method === "decrease") {
            setQantityForAddToCart(quantityForAddToCart - 1);
        } else {
            setQantityForAddToCart(quantityForAddToCart + 1);
        }
    };

    return (
        <Fragment>
            <div id="swirl_section_main_div">
                <style>
                    {`
          #swirl_ssv_video_progress::-webkit-progress-bar {
            background-color: ${swirlSettings?.front_color_buy_btn};
          }

          #swirl_ssv_video_progress::-webkit-progress-value {
            background-color: ${swirlSettings?.bk_color_buy_btn};
          }

          #swirl_ssv_video_progress::-moz-progress-bar {
            background-color: ${swirlSettings?.bk_color_buy_btn};
          }
        `}
                </style>
                <Modal
                    show={show}
                    title="Lightbox"
                    onClose={onClose}
                    innerHeight={innerHeight}
                >
                    {/* <ToastContainer /> */}
                    <Slider {...settings2} ref={sliderRef}>
                        {swirlData?.video?.map((el, index) => {
                            const video = el;
                            return (
                                <div className="swirl_ssv_ssv_modal_row" key={index}>
                                    <div
                                        className="swirl_ssv_pre_next_elems"
                                        onClick={handlePreviousSlide}
                                        style={{
                                            cursor: index === 0 || windowWidth < 1200 ? "default" : "pointer",
                                            backgroundImage: `url(${swirlData?.video[index - 1]?.cover_image
                                                })`,


                                        }}
                                    ></div>
                                    <div
                                        className="swirl_ssv_ssv_modal_square"
                                        style={{
                                            width:
                                                el.product.length > 0
                                                    ? windowWidth >= 1500
                                                        ? "50vw"
                                                        : "70%"
                                                    : windowWidth >= 1500
                                                        ? "50vw"
                                                        : "70%",
                                            marginTop: windowWidth > 833 ? "30px" : "0px",
                                            maxWidth:
                                                el.product.length === 0
                                                    ? windowWidth < 833
                                                        ? "100%"
                                                        : "340px"
                                                    : "auto",
                                            margin:
                                                windowWidth < 833
                                                    ? el.product.length === 0
                                                        ? "0px auto"
                                                        : "0px"
                                                    : "32px auto",
                                        }}
                                    >
                                        <div className="swirl_ssv_row">
                                            <VideoComponent
                                                thisVideo={el}
                                                onClose={onClose}
                                                videoLink={el.server_url}
                                                swirlData={swirlData}
                                                active={active}
                                                windowWidth={windowWidth}
                                                index={index}
                                                pipDisPlay={pipDisPlay}
                                                setPipDisplay={setPipDisplay}
                                                dataWs={dataWs}
                                                isVisibleMsg={isVisibleMsg}
                                                setIsVisibleMsg={setIsVisibleMsg}
                                                errorMessage={errorMessage}
                                                setErrorMessage={setErrorMessage}
                                                // getCartDetails={getCartDetails}
                                                quantity={quantity}
                                                loadingCart={loadingCart}
                                                setLoadingCart={setLoadingCart}
                                                setLoadingbtnId={setLoadingbtnId}
                                                loadingbtnId={loadingbtnId}
                                                wishlistData={wishlistData}
                                                getWishlistDetails={getWishlistDetails}
                                                removeFromWatchList={removeFromWatchList}
                                                sliderRef={sliderRef}
                                                swipeStatus={swipeStatus}
                                                setSwipeStatus={setSwipeStatus}
                                                getAvailabiityCheck={getAvailabiityCheck}
                                                cart={cart}
                                                checkProductStock={checkProductStock}
                                                show={show}
                                                showGif={showGif}
                                            />
                                            {video.product.length > 0 ? (
                                                <div className="swirl_ssv_column swirl_ssv_right_section_display_none">
                                                    {el?.product?.length > 1 ? (
                                                        <Fragment>
                                                            {descriptionOn ? (
                                                                <Fragment key={index}>
                                                                    <div
                                                                        className="swirl_ssv_right_column_main"
                                                                        style={{
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                        }}
                                                                    >
                                                                        <div
                                                                            style={{
                                                                                flexGrow: 0,
                                                                                borderBottom: "1px solid #eee",
                                                                                marginBottom: "10px",
                                                                                motionPath: "-7px",
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                                width: "100%",
                                                                            }}
                                                                        >
                                                                            <div
                                                                                className="swirl_ssv_arrow_left"
                                                                                onClick={() => {
                                                                                    setDescriptionOn(false);
                                                                                    setQantityForAddToCart(1)
                                                                                }}
                                                                                style={{ height: "auto", width: "12%" }}
                                                                            >
                                                                                <div>
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        viewBox="0 0 24 24"
                                                                                    >
                                                                                        <path
                                                                                            d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"
                                                                                            fill="rgba(23,23,28,1)"
                                                                                        ></path>
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                            <div
                                                                                className="heart_btn"
                                                                                style={{

                                                                                    marginLeft: "auto",
                                                                                    padding: "0px 10px",
                                                                                    height: "auto",
                                                                                    width: "50px",
                                                                                    cursor: "pointer",
                                                                                }}
                                                                                onClick={() => {
                                                                                    if (checkInWishListOrNo.status) {
                                                                                        removeFromWatchList(
                                                                                            checkInWishListOrNo?.obj?.id,
                                                                                        );
                                                                                    } else {
                                                                                        if (cart?.token) {
                                                                                            addToWatchListClicked(
                                                                                                descriptionData?.sku_code,
                                                                                                1,
                                                                                            );
                                                                                        } else {
                                                                                            onClose();
                                                                                            addToWatchListClicked(
                                                                                                descriptionData?.sku_code,
                                                                                                1,
                                                                                            );
                                                                                        }
                                                                                    }

                                                                                    CTAClicksssv(
                                                                                        swirlSettings?.brand_id,
                                                                                        descriptionData.product_id,
                                                                                        video?.video_id,
                                                                                        "2",
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {/* dasdasdertet */}
                                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill={`${checkInWishListOrNo ? "red" : "none"}`} stroke="rgba(0,0,0,0.6)" strokeWidth="2">
                                                                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                                                                </svg> */}

                                                                                {!checkInWishListOrNo.status ? (
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        width="28"
                                                                                        height="28"
                                                                                        fill="#000"
                                                                                        viewBox="0 0 256 256"
                                                                                    >
                                                                                        <rect
                                                                                            width="256"
                                                                                            height="256"
                                                                                            fill="none"
                                                                                        ></rect>
                                                                                        <path
                                                                                            d="M133.7,211.9l81-81c19.9-20,22.8-52.7,4-73.6a52,52,0,0,0-75.5-2.1L128,70.5,114.9,57.3c-20-19.9-52.7-22.8-73.6-4a52,52,0,0,0-2.1,75.5l83.1,83.1A8.1,8.1,0,0,0,133.7,211.9Z"
                                                                                            fill="none"
                                                                                            stroke="#000"
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            strokeWidth="8"
                                                                                        ></path>
                                                                                    </svg>
                                                                                ) : (
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        width="28"
                                                                                        height="28"
                                                                                        fill="#000"
                                                                                        viewBox="0 0 256 256"
                                                                                    >
                                                                                        <rect
                                                                                            width="256"
                                                                                            height="256"
                                                                                            fill="none"
                                                                                        ></rect>
                                                                                        <path
                                                                                            d="M133.7,211.9l81-81c19.9-20,22.8-52.7,4-73.6a52,52,0,0,0-75.5-2.1L128,70.5,114.9,57.3c-20-19.9-52.7-22.8-73.6-4a52,52,0,0,0-2.1,75.5l83.1,83.1A8.1,8.1,0,0,0,133.7,211.9Z"
                                                                                            fill="red"
                                                                                            stroke="#000"
                                                                                            strokeLinecap="round"
                                                                                            strokeLinejoin="round"
                                                                                            strokeWidth="8"
                                                                                        ></path>
                                                                                    </svg>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="swirl_ssv_product_tile_ssv"
                                                                            style={{
                                                                                flexGrow: 0,
                                                                                borderRadius: "10px",
                                                                                marginLeft: "10px",
                                                                                marginRight: "10px",
                                                                                display: "flex",
                                                                                cursor: swirlSettings.buy_now === 0 || descriptionData?.url === undefined ? "default" : "pointer"
                                                                            }}
                                                                            onClick={() => {
                                                                                redirectTOPDP(swirlSettings.buy_now, descriptionData?.url)
                                                                            }}
                                                                        >
                                                                            <div style={{ width: "75px" }}>
                                                                                <img
                                                                                    src={descriptionData?.image}
                                                                                    alt="product"
                                                                                    style={{ border: "1px solid #aaa" }}
                                                                                    className="swirl_ssv_product_img_ssv swirl_ssv_prduct_on_right"
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                className="swirl_ssv_product_info_tile_ssv"
                                                                                style={{ width: "calc(100% - 75px)" }}
                                                                            >
                                                                                <div
                                                                                    className="swirl_ssv_title_product_desc"
                                                                                    style={{
                                                                                        textWrap: "nowrap",
                                                                                        overflow: "hidden",
                                                                                        textOverflow: "ellipsis",
                                                                                    }}
                                                                                >
                                                                                    {sliceString(
                                                                                        descriptionData.title,
                                                                                        100,
                                                                                    )}
                                                                                </div>

                                                                                {swirlSettings.product_price_status ===
                                                                                    1 ? (
                                                                                    <div
                                                                                        className="swirl_ssv_product_price"
                                                                                        style={{
                                                                                            color:
                                                                                                swirlSettings?.mrp_fk_color,
                                                                                            display: "flex",
                                                                                        }}
                                                                                    >
                                                                                        {descriptionData.discount_price ===
                                                                                            descriptionData.price ? (
                                                                                            <p
                                                                                                style={{
                                                                                                    fontWeight: "bold",
                                                                                                    color:
                                                                                                        swirlSettings?.mrp_fk_color,
                                                                                                    fontSize: "15px",
                                                                                                    margin: "0",
                                                                                                }}
                                                                                            >
                                                                                                {
                                                                                                    new Intl.NumberFormat(
                                                                                                        undefined,
                                                                                                        {
                                                                                                            style: "currency",
                                                                                                            currency:
                                                                                                                el.product[0]
                                                                                                                    .currencyname,
                                                                                                        },
                                                                                                    )
                                                                                                        .formatToParts(0)
                                                                                                        .find(
                                                                                                            (part) =>
                                                                                                                part.type ===
                                                                                                                "currency",
                                                                                                        ).value
                                                                                                }
                                                                                                {descriptionData.price}
                                                                                            </p>
                                                                                        ) : (
                                                                                            <p style={{ margin: "0" }}>
                                                                                                {" "}
                                                                                                <span
                                                                                                    style={{
                                                                                                        fontWeight: "bold",
                                                                                                        marginRight: "5px",
                                                                                                        color:
                                                                                                            swirlSettings?.mrp_fk_color,
                                                                                                        fontSize: "15px",
                                                                                                        margin: "0",
                                                                                                    }}
                                                                                                >
                                                                                                    {
                                                                                                        new Intl.NumberFormat(
                                                                                                            undefined,
                                                                                                            {
                                                                                                                style: "currency",
                                                                                                                currency:
                                                                                                                    el.product[0]
                                                                                                                        .currencyname,
                                                                                                            },
                                                                                                        )
                                                                                                            .formatToParts(0)
                                                                                                            .find(
                                                                                                                (part) =>
                                                                                                                    part.type ===
                                                                                                                    "currency",
                                                                                                            ).value
                                                                                                    }
                                                                                                    {
                                                                                                        descriptionData.discount_price
                                                                                                    }
                                                                                                </span>{" "}
                                                                                                <del
                                                                                                    style={{
                                                                                                        fontWeight: "200",
                                                                                                        color:
                                                                                                            swirlSettings?.mrp_fk_color,
                                                                                                        fontSize: "15px",
                                                                                                        margin: "0",
                                                                                                    }}
                                                                                                >
                                                                                                    {
                                                                                                        new Intl.NumberFormat(
                                                                                                            undefined,
                                                                                                            {
                                                                                                                style: "currency",
                                                                                                                currency:
                                                                                                                    el.product[0]
                                                                                                                        .currencyname,
                                                                                                            },
                                                                                                        )
                                                                                                            .formatToParts(0)
                                                                                                            .find(
                                                                                                                (part) =>
                                                                                                                    part.type ===
                                                                                                                    "currency",
                                                                                                            ).value
                                                                                                    }
                                                                                                    {descriptionData.price}
                                                                                                </del>
                                                                                            </p>
                                                                                        )}
                                                                                        {descriptionData.discount_price ===
                                                                                            descriptionData.price ? (
                                                                                            <p
                                                                                                style={{
                                                                                                    textAlign: "center",
                                                                                                    visibility: "hidden",
                                                                                                    fontSize: "15px",
                                                                                                    margin: "0",
                                                                                                }}
                                                                                            >
                                                                                                {countPercentage(
                                                                                                    descriptionData,
                                                                                                )}{" "}
                                                                                                OFF
                                                                                            </p>
                                                                                        ) : (
                                                                                            <span
                                                                                                className="swirl_ssv_discount_percent_badge"
                                                                                                style={{
                                                                                                    backgroundColor:
                                                                                                        swirlSettings?.off_bk_color,
                                                                                                    color:
                                                                                                        swirlSettings?.off_fk_color,
                                                                                                    fontSize: "13px",
                                                                                                    margin: "0",
                                                                                                }}
                                                                                            >
                                                                                                {countPercentage(
                                                                                                    descriptionData,
                                                                                                )}{" "}
                                                                                                OFF
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                ) : (
                                                                                    ""
                                                                                )}
                                                                            </div>
                                                                        </div>

                                                                        <div
                                                                            className="swirl_ssv_description_product"
                                                                            style={{
                                                                                flexGrow: "152",
                                                                                marginTop: "-30px",
                                                                            }}
                                                                        >
                                                                            <h3>Product Description</h3>
                                                                            <p style={{ marginTop: "-15px" }}>
                                                                                {sliceString(
                                                                                    descriptionData.desription,
                                                                                    250,
                                                                                )}{" "}
                                                                            </p>
                                                                            <div
                                                                                className="swirl_ssv_quantity_section"
                                                                                style={{
                                                                                    display: "flex",
                                                                                    width: "100%",
                                                                                    alignItems: "center",
                                                                                    alignContent: "space-between",
                                                                                }}
                                                                            >
                                                                                <p>Choose Quantity</p>
                                                                                <div
                                                                                    style={{
                                                                                        marginLeft: "auto",
                                                                                        display: "flex",
                                                                                        marginRight: "10px"
                                                                                    }}
                                                                                >
                                                                                    <button
                                                                                        style={{
                                                                                            padding: "10px 20px",
                                                                                            outline: "none",
                                                                                            border: "none",
                                                                                            cursor: "pointer",
                                                                                        }}
                                                                                        disabled={
                                                                                            quantityForAddToCart === 1
                                                                                                ? true
                                                                                                : false
                                                                                        }
                                                                                        onClick={() =>
                                                                                            handleQuantity(
                                                                                                "decrease",
                                                                                                descriptionData.sku_code,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        -
                                                                                    </button>
                                                                                    <input
                                                                                        className="swirl_ssv_quantity_section_input"
                                                                                        disabled
                                                                                        value={quantityForAddToCart}
                                                                                    />
                                                                                    <button
                                                                                        style={{
                                                                                            padding: "10px 20px",
                                                                                            outline: "none",
                                                                                            border: "none",
                                                                                            cursor: "pointer",
                                                                                        }}
                                                                                        disabled={
                                                                                            quantityForAddToCart === 20
                                                                                                ? true
                                                                                                : false
                                                                                        }
                                                                                        id="btn_for_increase"
                                                                                        onClick={() =>
                                                                                            handleQuantity(
                                                                                                "increase",
                                                                                                descriptionData.sku_code,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        +
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                            {dataWs === "1" && <ReviewCompoNent show={show} height="270px" skuCode={descriptionData?.sku_code} />}
                                                                        </div>

                                                                        <div
                                                                            style={{
                                                                                display: "flex",
                                                                                width: "100%",
                                                                                marginBottom: "5px",
                                                                            }}
                                                                        >
                                                                            {swirlSettings.add_to_cart === 1 ? (
                                                                                <button
                                                                                    onClick={() => {
                                                                                        setLoadingbtnId("4");
                                                                                        setLoadingCart(true);
                                                                                        addTocartClicked(
                                                                                            descriptionData?.sku_code,
                                                                                            1,
                                                                                        );
                                                                                        CTAClicksssv(
                                                                                            swirlSettings?.brand_id,
                                                                                            descriptionData.product_id,
                                                                                            video?.video_id,
                                                                                            "2",
                                                                                        );
                                                                                    }}
                                                                                    style={{
                                                                                        width: "100%",
                                                                                        margin: "5px",
                                                                                        borderRadius: "5px",
                                                                                        cursor: "pointer",
                                                                                        backgroundColor: "#fff",
                                                                                        color:
                                                                                            swirlSettings?.front_color_add_to_cart_btn,
                                                                                        border: `1px solid ${swirlSettings?.bk_color_add_to_cart_btn}`,
                                                                                    }}
                                                                                >
                                                                                    <CartBtnLoadingComp
                                                                                        preViousText="Adding"
                                                                                        btnId="4"
                                                                                        NextText={
                                                                                            swirlSettings?.add_to_cart_btn
                                                                                        }
                                                                                        loadingCart={loadingCart}
                                                                                        setLoadingCart={setLoadingCart}
                                                                                        loadingbtnId={loadingbtnId}
                                                                                        setLoadingbtnId={setLoadingbtnId}
                                                                                    />
                                                                                </button>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                            {swirlSettings.buy_now === 1 ? (
                                                                                <button
                                                                                    onClick={() => {
                                                                                        CTAClicksssv(
                                                                                            swirlSettings?.brand_id,
                                                                                            descriptionData.product_id,
                                                                                            video?.video_id,
                                                                                            "1",
                                                                                        );

                                                                                        if (dataWs === "1") {
                                                                                            const addToCartEvent = new CustomEvent('ADDED_TO_CART', {
                                                                                                detail: {
                                                                                                    sku: descriptionData?.sku_code,
                                                                                                    quantity: quantityForAddToCart,
                                                                                                    buynow: true
                                                                                                },
                                                                                            });
                                                                                            window.dispatchEvent(addToCartEvent);
                                                                                            enableScrollssv();
                                                                                        } else {
                                                                                            onClose();
                                                                                            window.open(descriptionData?.url);
                                                                                        }

                                                                                        // console.log(el);
                                                                                    }}
                                                                                    style={{
                                                                                        width: "100%",
                                                                                        margin: "5px",
                                                                                        borderRadius: "5px",
                                                                                        cursor: "pointer",
                                                                                        color:
                                                                                            swirlSettings?.front_color_buy_btn,
                                                                                        border: `1px solid ${swirlSettings?.bk_color_buy_btn}`,
                                                                                        backgroundColor:
                                                                                            swirlSettings?.bk_color_buy_btn,
                                                                                        padding: "10px",
                                                                                    }}
                                                                                >
                                                                                    {swirlSettings?.buy_btn}
                                                                                </button>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                            <div
                                                                                title="Add to Watchlist"
                                                                                onClick={() => {
                                                                                    if (checkInWishListOrNo.status) {
                                                                                        removeFromWatchList(
                                                                                            checkInWishListOrNo?.obj?.id,
                                                                                        );
                                                                                    } else {
                                                                                        if (cart?.token) {
                                                                                            addToWatchListClicked(
                                                                                                descriptionData?.sku_code,
                                                                                                1,
                                                                                            );
                                                                                        } else {
                                                                                            onClose();
                                                                                            addToWatchListClicked(
                                                                                                descriptionData?.sku_code,
                                                                                                1,
                                                                                            );
                                                                                        }
                                                                                    }

                                                                                    CTAClicksssv(
                                                                                        swirlSettings?.brand_id,
                                                                                        descriptionData.product_id,
                                                                                        video?.video_id,
                                                                                        "2",
                                                                                    );
                                                                                }}
                                                                                style={{
                                                                                    border: "1px solid #aaa",
                                                                                    padding: "5px 8px",
                                                                                    borderRadius: "5px",
                                                                                    margin: "5px",
                                                                                    cursor: "pointer",
                                                                                    backgroundColor: "#fff",
                                                                                    display: "none",
                                                                                }}
                                                                            >
                                                                                <div>
                                                                                    <img
                                                                                        alt="Playlist"
                                                                                        width="32"
                                                                                        height="32"
                                                                                        src="https://cdn.iconscout.com/icon/premium/png-256-thumb/playlist-1654818-1407587.png?f=webp"
                                                                                    />
                                                                                </div>
                                                                                {/* <span className='badge_add_to_cart' style={{ backgroundColor: swirlSettings?.bk_color_buy_btn, position: 'absolute', color: swirlSettings?.front_color_buy_btn, marginTop: "-45px", marginLeft: "18px", width: "20px", height: "20px", textAlign: "center", borderRadius: "50%", fontSize: "12px", display: "grid", placeItems: "center" }}>1</span> */}
                                                                            </div>
                                                                            {swirlSettings.add_to_cart === 1 ? (
                                                                                <div
                                                                                    onClick={() => {
                                                                                        window.open(`/${swirlSettings?.cust_cart_redirection_link}`, "_blank");
                                                                                    }}
                                                                                    style={{
                                                                                        border: "1px solid #aaa",
                                                                                        padding: "5px 8px",
                                                                                        borderRadius: "5px",
                                                                                        margin: "5px",
                                                                                        cursor: "pointer",
                                                                                        backgroundColor: "#fff",
                                                                                    }}
                                                                                >
                                                                                    <div>
                                                                                        <img
                                                                                            className="swirl_ssv_cart_img"
                                                                                            src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/cart-icon.webp"
                                                                                            height={26}
                                                                                            alt="cart_icon"
                                                                                        />
                                                                                        {/* <svg
                                                                                            stroke="none"
                                                                                            fill="none"
                                                                                            strokeWidth={0}
                                                                                            viewBox="0 0 24 24"
                                                                                            color="black"
                                                                                            height={26}
                                                                                            width={26}
                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                            style={{
                                                                                                color: "rgb(0, 0, 0) !important",
                                                                                            }}
                                                                                        >
                                                                                            <path
                                                                                                fill="none"
                                                                                                stroke="#000"
                                                                                                strokeWidth={2}
                                                                                                d="M5,5 L22,5 L20,14 L7,14 L4,2 L0,2 M7,14 L8,18 L21,18 M19,23 C18.4475,23 18,22.5525 18,22 C18,21.4475 18.4475,21 19,21 C19.5525,21 20,21.4475 20,22 C20,22.5525 19.5525,23 19,23 Z M9,23 C8.4475,23 8,22.5525 8,22 C8,21.4475 8.4475,21 9,21 C9.5525,21 10,21.4475 10,22 C10,22.5525 9.5525,23 9,23 Z"
                                                                                            />
                                                                                        </svg> */}
                                                                                    </div>
                                                                                    <span
                                                                                        className="swirl_ssv_badge_add_to_cart"
                                                                                        style={{
                                                                                            backgroundColor:
                                                                                                swirlSettings?.bk_color_buy_btn,
                                                                                            position: "absolute",
                                                                                            color:
                                                                                                swirlSettings?.front_color_buy_btn,
                                                                                            marginTop: "-45px",
                                                                                            marginLeft: "18px",
                                                                                            width: "20px",
                                                                                            height: "20px",
                                                                                            textAlign: "center",
                                                                                            borderRadius: "50%",
                                                                                            fontSize: "12px",
                                                                                            display: "grid",
                                                                                            placeItems: "center",
                                                                                        }}
                                                                                    >
                                                                                        {quantity ? quantity : "0"}
                                                                                    </span>
                                                                                </div>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </Fragment>
                                                            ) : (
                                                                <div key={index}>
                                                                    <div className="swirl_ssv_right_column_main">
                                                                        {el.product.map((el, index) => {
                                                                            const currencySymbol =
                                                                                new Intl.NumberFormat(undefined, {
                                                                                    style: "currency",
                                                                                    currency: el.currencyname,
                                                                                })
                                                                                    .formatToParts(0)
                                                                                    .find(
                                                                                        (part) => part.type === "currency",
                                                                                    ).value;

                                                                            const countPercentage = () => {
                                                                                const actualPrice = el.price;
                                                                                const discountedPrice =
                                                                                    el.discount_price;

                                                                                if (
                                                                                    actualPrice > 0 &&
                                                                                    discountedPrice > 0
                                                                                ) {
                                                                                    const discountPercentage = Math.round(
                                                                                        ((actualPrice - discountedPrice) /
                                                                                            actualPrice) *
                                                                                        100,
                                                                                    );
                                                                                    return discountPercentage + "%";
                                                                                } else {
                                                                                    return "Invalid prices";
                                                                                }
                                                                            };
                                                                            return (
                                                                                <div
                                                                                    style={{
                                                                                        display: "flex",
                                                                                        padding: "10px",
                                                                                        borderBottom: "1px solid #eee",
                                                                                        cursor: "pointer"
                                                                                    }}
                                                                                    key={index}
                                                                                >
                                                                                    <div
                                                                                        className="swirl_col_1"
                                                                                        style={{ width: "80px" }}
                                                                                    >
                                                                                        <img
                                                                                            src={el.image}
                                                                                            style={{
                                                                                                border: "1px solid #aaa",
                                                                                            }}
                                                                                            onClick={() => {
                                                                                                setDescriptionOn(true);
                                                                                                setDescriptionData(el);
                                                                                            }}
                                                                                            alt="product"
                                                                                            className="swirl_ssv_product_img_ssv swirl_ssv_prduct_on_right"
                                                                                        />
                                                                                    </div>

                                                                                    <div
                                                                                        className="swirl_col_2"
                                                                                        style={{
                                                                                            width: "calc(90% - 80px)",
                                                                                            padding: "0px 5px",
                                                                                        }}
                                                                                    >
                                                                                        <p
                                                                                            onClick={() => {
                                                                                                setDescriptionOn(true);
                                                                                                setDescriptionData(el);
                                                                                            }}
                                                                                            style={{
                                                                                                fontWeight: "bold",
                                                                                                fontSize: "14px",
                                                                                                textWrap: "nowrap",
                                                                                                overflow: "hidden",
                                                                                                textOverflow: "ellipsis",
                                                                                            }}
                                                                                        >
                                                                                            {sliceString(el.title, 100)}
                                                                                        </p>
                                                                                        {swirlSettings.product_price_status ===
                                                                                            1 ? (
                                                                                            <Fragment>
                                                                                                <div
                                                                                                    style={{
                                                                                                        display: "flex",
                                                                                                        alignItems: "center",
                                                                                                    }}
                                                                                                >
                                                                                                    {el.discount_price ===
                                                                                                        el.price ? (
                                                                                                        <p
                                                                                                            style={{
                                                                                                                fontWeight: "bold",
                                                                                                                color:
                                                                                                                    swirlSettings?.mrp_fk_color,
                                                                                                                fontSize: "15px",
                                                                                                                margin: "0",
                                                                                                            }}
                                                                                                        >
                                                                                                            {currencySymbol}
                                                                                                            {el.price}
                                                                                                        </p>
                                                                                                    ) : (
                                                                                                        <p style={{ margin: "0" }}>
                                                                                                            {" "}
                                                                                                            <span
                                                                                                                style={{
                                                                                                                    fontWeight: "bold",
                                                                                                                    marginRight: "5px",
                                                                                                                    color:
                                                                                                                        swirlSettings?.mrp_fk_color,
                                                                                                                    fontSize: "15px",
                                                                                                                    margin: "0",
                                                                                                                }}
                                                                                                            >
                                                                                                                {currencySymbol}
                                                                                                                {el.discount_price}
                                                                                                            </span>{" "}
                                                                                                            <del
                                                                                                                style={{
                                                                                                                    fontWeight: "200",
                                                                                                                    color:
                                                                                                                        swirlSettings?.mrp_fk_color,
                                                                                                                    fontSize: "15px",
                                                                                                                    margin: "0",
                                                                                                                }}
                                                                                                            >
                                                                                                                {currencySymbol}
                                                                                                                {el.price}
                                                                                                            </del>
                                                                                                        </p>
                                                                                                    )}
                                                                                                    {el.discount_price ===
                                                                                                        el.price ? (
                                                                                                        <p
                                                                                                            style={{
                                                                                                                textAlign: "center",
                                                                                                                visibility: "hidden",
                                                                                                                fontSize: "15px",
                                                                                                                margin: "0",
                                                                                                            }}
                                                                                                        >
                                                                                                            {countPercentage()} OFF
                                                                                                        </p>
                                                                                                    ) : (
                                                                                                        <span
                                                                                                            className="swirl_ssv_discount_percent_badge"
                                                                                                            style={{
                                                                                                                backgroundColor:
                                                                                                                    swirlSettings?.off_bk_color,
                                                                                                                color:
                                                                                                                    swirlSettings?.off_fk_color,
                                                                                                                fontSize: "13px",
                                                                                                                margin: "0",
                                                                                                            }}
                                                                                                        >
                                                                                                            {countPercentage()} OFF
                                                                                                        </span>
                                                                                                    )}
                                                                                                </div>
                                                                                            </Fragment>
                                                                                        ) : (
                                                                                            ""
                                                                                        )}
                                                                                        <div
                                                                                            style={{
                                                                                                marginTop: "5px",
                                                                                                display: "flex",
                                                                                            }}
                                                                                        >
                                                                                            {swirlSettings.add_to_cart ===
                                                                                                1 ? (
                                                                                                <button
                                                                                                    className="swirl_ssv_add_to_cart_btn_ssv"
                                                                                                    style={{
                                                                                                        color:
                                                                                                            swirlSettings?.front_color_add_to_cart_btn,
                                                                                                    }}
                                                                                                    onClick={() => {
                                                                                                        setLoadingbtnId(
                                                                                                            `5${index}`,
                                                                                                        );
                                                                                                        setLoadingCart(true);
                                                                                                        addTocartClicked(
                                                                                                            el?.sku_code,
                                                                                                            1,
                                                                                                        );
                                                                                                        CTAClicksssv(
                                                                                                            swirlSettings?.brand_id,
                                                                                                            el.product_id,
                                                                                                            video?.video_id,
                                                                                                            "2",
                                                                                                        );
                                                                                                    }}
                                                                                                >
                                                                                                    <CartBtnLoadingComp
                                                                                                        preViousText="Adding"
                                                                                                        btnId={`5${index}`}
                                                                                                        NextText={
                                                                                                            swirlSettings?.add_to_cart_btn
                                                                                                        }
                                                                                                        loadingCart={loadingCart}
                                                                                                        setLoadingCart={
                                                                                                            setLoadingCart
                                                                                                        }
                                                                                                        loadingbtnId={loadingbtnId}
                                                                                                        setLoadingbtnId={
                                                                                                            setLoadingbtnId
                                                                                                        }
                                                                                                    />
                                                                                                </button>
                                                                                            ) : (
                                                                                                ""
                                                                                            )}{" "}
                                                                                            {swirlSettings.buy_now === 1 ? (
                                                                                                <button
                                                                                                    className="swirl_ssv_buy_btn_ssv"
                                                                                                    onClick={() => {
                                                                                                        CTAClicksssv(
                                                                                                            swirlSettings?.brand_id,
                                                                                                            el.product_id,
                                                                                                            video?.video_id,
                                                                                                            "1",
                                                                                                        );

                                                                                                        if (dataWs === "1") {
                                                                                                            const addToCartEvent = new CustomEvent('ADDED_TO_CART', {
                                                                                                                detail: {
                                                                                                                    sku: el?.sku_code,
                                                                                                                    quantity: quantityForAddToCart,
                                                                                                                    buynow: true
                                                                                                                },
                                                                                                            });
                                                                                                            window.dispatchEvent(addToCartEvent);
                                                                                                            enableScrollssv();
                                                                                                        } else {
                                                                                                            onClose();
                                                                                                            window.open(el?.url);
                                                                                                        }

                                                                                                    }}
                                                                                                >
                                                                                                    {swirlSettings?.buy_btn}
                                                                                                </button>
                                                                                            ) : (
                                                                                                ""
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div
                                                                                        className="swirl_col_3 "
                                                                                        style={{ width: "10%" }}
                                                                                    >
                                                                                        <div
                                                                                            className="swirl_ssv_arrow_right"
                                                                                            onClick={() => {
                                                                                                setDescriptionOn(true);
                                                                                                setDescriptionData(el);
                                                                                            }}
                                                                                        >
                                                                                            <svg
                                                                                                width="36"
                                                                                                height="36"
                                                                                                viewBox="0 0 36 36"
                                                                                                fill="none"
                                                                                                xmlns="http:www.w3.org/2000/svg"
                                                                                            >
                                                                                                <g clipPath="url(#clip0_1415_6645)">
                                                                                                    <path
                                                                                                        d="M19.757 18.0001L12.332 10.5751L14.453 8.4541L23.999 18.0001L14.453 27.5461L12.332 25.4251L19.757 18.0001Z"
                                                                                                        fill="black"
                                                                                                    />
                                                                                                </g>
                                                                                                <defs>
                                                                                                    <clipPath id="clip0_1415_6645">
                                                                                                        <rect
                                                                                                            width="36"
                                                                                                            height="36"
                                                                                                            fill="white"
                                                                                                        />
                                                                                                    </clipPath>
                                                                                                </defs>
                                                                                            </svg>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Fragment>
                                                    ) : (
                                                        <div key={index}>
                                                            <ProductDescComp
                                                                el={video}
                                                                swirlSettings={swirlSettings}
                                                                quantityForAddToCart={quantityForAddToCart}
                                                                handleQuantity={handleQuantity}
                                                                addTocartClicked={addTocartClicked}
                                                                CTAClicksssv={CTAClicksssv}
                                                                video={video}
                                                                addToWatchListClicked={addToWatchListClicked}
                                                                removeFromWatchList={removeFromWatchList}
                                                                quantity={quantity}
                                                                type={"for_multiple"}
                                                                descriptionData={el.product[0]}
                                                                onClose={onClose}
                                                                loadingCart={loadingCart}
                                                                setLoadingCart={setLoadingCart}
                                                                loadingbtnId={loadingbtnId}
                                                                setLoadingbtnId={setLoadingbtnId}
                                                                wishlistData={wishlistData}
                                                                getAvailabiityCheck={getAvailabiityCheck}
                                                                cart={cart}
                                                                dataWs={dataWs}
                                                                show={show}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="swirl_ssv_pre_next_elems"
                                        onClick={handleNextSlide}
                                        style={{
                                            backgroundImage: `url(${swirlData?.video[index + 1]?.cover_image
                                                })`,
                                            cursor: (index === swirlData?.video.length - 1) || windowWidth < 1200 ? "default" : "pointer",

                                        }}
                                    ></div>
                                </div>
                            );
                        })}
                    </Slider>
                </Modal>

                <Slider {...settings} >
                    {swirlData?.video?.map((el, index) => {
                        const countPercentage = () => {
                            const actualPrice = el.product[0].price;
                            const discountedPrice = el.product[0].discount_price;

                            if (actualPrice > 0 && discountedPrice > 0) {
                                const discountPercentage = Math.round(
                                    ((actualPrice - discountedPrice) / actualPrice) * 100,
                                );
                                return discountPercentage + "%";
                            } else {
                                return "Invalid prices";
                            }
                        };

                        const swirlSettings = swirlData?.data;
                        const currencySymbol =
                            el.product.length > 0
                                ? new Intl.NumberFormat(undefined, {
                                    style: "currency",
                                    currency: el.product[0].currencyname,
                                })
                                    .formatToParts(0)
                                    .find((part) => part.type === "currency").value
                                : "$";

                        function formatVideoDuration() {
                            const durationInSeconds = el.video_len;
                            const minutes = Math.floor(durationInSeconds / 60);
                            const seconds = Math.floor(durationInSeconds % 60);

                            const formattedMinutes =
                                minutes < 10 ? `0${minutes}` : `${minutes}`;
                            const formattedSeconds =
                                seconds < 10 ? `0${seconds}` : `${seconds}`;

                            return `${formattedMinutes}:${formattedSeconds}`;
                        }

                        return (
                            <div className="swirl_ssv_main_div_card" key={index}>
                                <div className="swirl_ssv_card">
                                    <div
                                        className="swirl_ssv_media-container"
                                        onClick={() => handleClick(index)}
                                    >
                                        {swirlSettings.auto_play === "1" ? (
                                            <video
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                    display: "block",
                                                }}
                                                autoPlay={index < 5 && !show ? true : false}
                                                preload="metadata"
                                                loading="lazy"
                                                playsInline
                                                poster={el.cover_image}
                                                muted
                                                loop
                                            >
                                                <source src={el.cover_video} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <img
                                                src={el.cover_image}
                                                alt=" Description"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                    display: "block",
                                                }}
                                            />
                                        )}

                                        {/* <img src={el.cover_image} alt=" Description" style={{width:"100%",height:"auto",display:"block"}} />  */}

                                        <div className="swirl_ssv_overlay">
                                            <p
                                                className="swirl_ssv_total_views"
                                                style={{
                                                    visibility:
                                                        swirlSettings.views === "1" ? "" : "hidden",
                                                }}
                                            >
                                                <img
                                                    style={{ marginRight: "3px" }}
                                                    src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/views-icon.webp"
                                                    height="20px"
                                                    alt="toatal videos"
                                                />{" "}
                                                {el.total_views}
                                            </p>
                                        </div>
                                        <div className="swirl_ssv_overlay-right">
                                            <span
                                                className="swirl_ssv_ssv_duration"
                                                style={{
                                                    visibility:
                                                        swirlSettings?.time_sec === "1" ? "" : "hidden",
                                                }}
                                            >
                                                {formatVideoDuration()}
                                            </span>
                                        </div>
                                        <div className="swirl_ssv_overlay-center">
                                            <div className="swirl_ssv_elements_over_short_play_btn">
                                                <img
                                                    className="swirl_ssv_playpausse_btn_carousel_outer"
                                                    src="https://cdn.jsdelivr.net/gh/SwirlAdmin/swirl-cdn/assets/images/goswirl-webp/play.webp"
                                                    alt="play pause btn"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {swirlSettings.product_blog_img === 1 &&
                                        el.product.length > 0 ? (
                                        <div
                                            className="swirl_ssv_produt_section_ssv"
                                            onClick={() => handleClick(index)}
                                        >
                                            <div className="swirl_ssv_image-container">
                                                <img
                                                    className="swirl_ssv_prodct_img_ssv"
                                                    alt="product"
                                                    src={el.product[0].image}
                                                />
                                                {el?.product?.length > 1 ? (
                                                    <div
                                                        className="swirl_ssv_badge"
                                                        style={{
                                                            backgroundColor: swirlSettings?.bk_color_buy_btn,
                                                            color: swirlSettings?.front_color_buy_btn,
                                                        }}
                                                    >
                                                        {el.product.length}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div
                                                className="swirl_ssv_product_info"
                                                style={{
                                                    height: "auto",
                                                    paddingBottom:
                                                        swirlSettings.product_price_status === 1
                                                            ? "0px"
                                                            : "15px",
                                                }}
                                            >
                                                <p>{el.product[0].title}</p>
                                                <div
                                                    style={{
                                                        display:
                                                            swirlSettings.product_price_status === 1
                                                                ? "block"
                                                                : "none",
                                                    }}
                                                >
                                                    {el.product[0].discount_price ===
                                                        el.product[0].price ? (
                                                        <h3
                                                            style={{
                                                                fontWeight: "bold",
                                                                color: swirlSettings?.mrp_fk_color,
                                                            }}
                                                        >
                                                            {currencySymbol}
                                                            {el.product[0].price}
                                                        </h3>
                                                    ) : (
                                                        <h3>
                                                            {" "}
                                                            <span
                                                                style={{
                                                                    fontWeight: "bold",
                                                                    marginRight: "5px",
                                                                    color: swirlSettings?.mrp_fk_color,
                                                                }}
                                                            >
                                                                {currencySymbol}
                                                                {el.product[0].discount_price}
                                                            </span>{" "}
                                                            <del
                                                                style={{ color: swirlSettings?.mrp_fk_color }}
                                                            >
                                                                {currencySymbol}
                                                                {el.product[0].price}
                                                            </del>
                                                        </h3>
                                                    )}
                                                    {el.product[0].discount_price ===
                                                        el.product[0].price ? (
                                                        <p
                                                            style={{
                                                                textAlign: "center",
                                                                visibility: "hidden",
                                                            }}
                                                        >
                                                            {countPercentage()} OFF
                                                        </p>
                                                    ) : (
                                                        <div>
                                                            <p style={{ textAlign: "center" }}>
                                                                <span
                                                                    className="swirl_ssv_discount_percent_badge"
                                                                    style={{
                                                                        backgroundColor:
                                                                            swirlSettings?.off_bk_color,
                                                                        color: swirlSettings?.off_fk_color,
                                                                        fontSize: "13px",
                                                                    }}
                                                                >
                                                                    {countPercentage()} OFF
                                                                </span>
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </Slider>
                {pipDisPlay ? (
                    <PipComp
                        videoData={JSON.parse(localStorage.getItem("_pip_video_data"))}
                        pipDisPlay={pipDisPlay}
                        setPipDisplay={setPipDisplay}
                        handleClick={handleClick}
                        index={active}
                    />
                ) : (
                    ""
                )}
            </div>
        </Fragment>
    );
};

export default SwirlShortVideos;
