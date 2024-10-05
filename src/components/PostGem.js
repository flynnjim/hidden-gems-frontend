'use client'
import { postGemByUserID } from "@/api/api";
import { useState } from "react";

export const PostGem = (user_id, setGems) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    // const [latitude, setLatitude] = useState(null)
    // const [longitude, setLongitude] = useState(null)
    // const [address, setAddress] = useState(null)
    const [date, setDate] = useState(null)
    const [type, setType] = useState(null)

    const [submitted, setSubmitted] = useState(false)

    const [validPost, setValidPost] = useState(false)

    const [disabledButton, setDisableButton] = useState(false)

    const [gemLoading, setGemLoading] = useState(false)

    const [isGemLoading, setIsGemLoading] = useState(false)

    const [error, setError] = useState(null)

    const resetForm = () => {
        setSubmitted(false)
        setTitle("")
        setDescription("")
        setCategory(null)
        setImgUrl(null)
        // setLatitude(null)
        // setLongitude(null)
        // setAddress(null)
        setDate(null)
        setType(null)
    }

    function titleInput(event) {
        setTitle(event.target.value)
    }
    function descriptionInput(event) {
        setDescription(event.target.value)
    }
    function categoryInput(event) {
        setCategory(event.target.value)
    }
    function dateInput(event) {
        setDate(event.target.value)
    }
    function typeInput(event) {
        setType(event.target.value)
    }

    // const postObject = {
    //     title: title,
    //     description: description,
    //     category: category,
    //     img_url: imgUrl,
    //     // latitude: latitude,
    //     // longitude: longitude,
    //     // address: address,
    //     date: date,
    //     user_id: user_id,
    //     type: type
    //   }

    function handleSubmit(event) {
        event.preventDefault();
        if (!validPost) {
            setDisableButton(true)
        } else {
            setDisableButton(false)
            setValidPost(true)
            setIsGemLoading(true)
            // return postGemByUserID(postObject)
            .then((gemData) => {
                setGems((currentGems) => {
                    return [gemData.data.gem, ...currentGems]
                })
            })
            .catch((err) => {
                console.log(err)
                setError(err)
            })
        }
    }

    return (
        <section>
            <h2>Post a New Gem</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor=""></label>
            </form>
        </section>
    )
}