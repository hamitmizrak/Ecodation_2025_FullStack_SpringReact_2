// rfce
import React, {useEffect, useState} from 'react';
import {ENDPOINTS} from "../../config/api";
import {showError} from "./resuability/toastHelper";

// t: dil için
function About({t}) {

    // Field
    // Modal Kontrolleri
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    // Form
    const [form, setForm] = useState({
        aboutName: "",
        vision: "",
        mission: "",
        imageUrl: "",
        systemCreatedDate: ""
    });

    // Error
    const [formError, setFormError] = useState([]);

    // About Listesi
    const [abouts, setAbouts] = useState([]);

    // Api'den gelen verileri almak
    const fetchAbouts =  () => {
        try {
            // Api'den gelen verileri almak için
            const response = ENDPOINTS.ABOUT.LIST
            setAbouts(response.data || [])
        } catch (e) {
            showError("About Listesi yüklenmedi")
        }
    }


    // Database'deki api'den gelen verileri almak
    useEffect(
        ()=>{
            fetchAbouts()
        },[]
    )

    // onChange
    const handleFormChange =(e)=>{
        const {name, value} = e.target;
        setForm((prev)=>({...prev,[name]:value}));
        setFormError((prev)=>({...prev,[name]:undefined}));
    }

    // CREATE MODAL
    const handleCreateModal= (about)=>{
        setForm({
            aboutName: "",
            vision:  "",
            mission:   "",
            imageUrl:  "",
        })
        setFormError({});
        // Create modal açılması için bunu ekleriz.
        setShowCreate(true)
    }

  /*  aboutName: about.aboutName || "",
        vision:  about.vision || "",
        mission:  about.mission || "",
        imageUrl:  about.imageUrl || "",*/

    // EDIT
    const handleEditModal= ()=>{}

    // VIEW
    const handleViewModal= ()=>{}

    // DELETE
    const handleDeleteModal= ()=>{}



    // RETURN
    return <React.Fragment>

        About ben bıradayım

    </React.Fragment>;
}

// I18N
export default About;
