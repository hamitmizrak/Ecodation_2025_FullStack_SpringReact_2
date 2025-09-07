// rfce
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReusableToast from "./resuability/ReusabilityToast";
import { showSuccess, showError } from "./resuability/toastHelper";
import { API_BASE, ENDPOINTS, IMAGE_BASE } from "../../config/api";
import modal from "bootstrap/js/src/modal";

// API Yardımcıları
const resolveImageUrl = (src) =>
    !src ? "" : /^https?:\/\//i.test(src) ? src : `${IMAGE_BASE}${src.startsWith("/") ? src : "/" + src}`;

// Date
const formatDate = (iso) => !iso ? "" : new Date(iso).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });

function About() {
    // About Listesi
    const [abouts, setAbouts] = useState([]);

    // Modal kontrolleri
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    // Form ve detaylar
    const [selectedAbout, setSelectedAbout] = useState(null);
    const [form, setForm] = useState({
        aboutName: "",
        mission: "",
        vision: "",
        imageUrl: "",
        imageFile: null,
    });
    const [formError, setFormError] = useState({});
    const [spinner, setSpinner] = useState(false);

    // Listeyi yükle
    const fetchAbouts = async () => {
        try {
            const res = await axios.get(`${API_BASE}${ENDPOINTS.ABOUT.LIST}`);
            setAbouts(res.data?.data || res.data?.result || res.data || []);
        } catch {
            showError("Hakkımızda listesi yüklenemedi");
        }
    };

    // useEffect
    useEffect(() => {
        fetchAbouts();
    }, []);

    // FORM FIELD CHANGE
    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imageFile") {
            setForm((prev) => ({ ...prev, imageFile: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
        setFormError((prev) => ({ ...prev, [name]: undefined }));
    };

    // CREATE MODAL AÇ
    const openCreateModal = () => {
        setForm({
            aboutName: "",
            mission: "",
            vision: "",
            imageUrl: "",
            imageFile: null,
        });
        setFormError({});
        setShowCreate(true);
    };

    // EDIT MODAL AÇ
    const openEditModal = (about) => {
        setSelectedAbout(about);
        setForm({
            aboutName: about.aboutName || "",
            mission: about.mission || "",
            vision: about.vision || "",
            imageUrl: about.imageUrl || "",
            imageFile: null,
        });
        setFormError({});
        setShowEdit(true);
    };

    // VIEW
    const openViewModal= async (about)=>{
        setSelectedAbout(about);
        setShowView(true);
    }

    // DELETE
    const openDeleteModal=  async (about)=>{
        setSelectedAbout(about);
        setShowView(true);
    }

    // CREATE SUBMIT
    const handleCreate = async (e)=>{
        // Browser sen dur bir şey yapma ben biliyorum
        e.preventDefault();

        // Error
        let err={};
        if(!form.aboutName) err.aboutName="Hakkımızda Zorunlu";
        if(!form.mission) err.mission="Hakkımızda Zorunlu";
        if(!form.vision) err.vision="Hakkımızda Zorunlu";
        setFormError(err);
        if(Object.keys(err).length>0) return;

        // Spinner Aktif
        setSpinner(true)

        try {
            // AboutDto
            const dto={
                aboutName: form.aboutName,
                mission: form.mission,
                vision: form.vision,
                imageUrl:form.imageUrl,
            }

            // Response
            let res;
            // Eğer formda resim yüklenmişse api'ye gönder
            if(form.imageFile){
                const fd= new FormData();
                // AboutApiImpl
                /*
                @RequestPart("about") String json, // <-- JSON string
                @RequestPart(value = "file", required = false) MultipartFile file) // <-- dosya parçası (adı */
                fd.append("about", new Blob([JSON.stringify(dto)], {type:"application/json"}));
                fd.append("file", form.imageFile);
                res = await axios.post(`${API_BASE}${ENDPOINTS.ABOUT.CREATE}`, fd, {headers:{"Content-Type":"multipart/form-data"}})
            }else{ //Eğer resim seçilmemişse
                res = await axios.post(`${API_BASE}${ENDPOINTS.ABOUT.CREATE}`,dto)
            }

            showSuccess("Hakkımızda başarıyla eklendi");
            setShowCreate(false);
            // Listeyi tazelesin
            fetchAbouts()
        }catch (e) {
            showError("Hakkımızda eklenemedi"+ (err.response?.data?.message || ""));
            setFormError(err.response?.data?.errors || {});
        }

        // Spinner kapat
        setSpinner(false);
    }

    // UPDATE SUBMIT
    const handlEdit = async (e)=>{
        // Browser sen dur bir şey yapma ben biliyorum
        e.preventDefault();

        // Error
        let err={};
        if(!form.aboutName) err.aboutName="Hakkımızda Zorunlu";
        if(!form.mission) err.mission="Hakkımızda Zorunlu";
        if(!form.vision) err.vision="Hakkımızda Zorunlu";
        setFormError(err);
        if(Object.keys(err).length>0) return;

        // Spinner Aktif
        setSpinner(true)

        try {
            // AboutDto
            const dto={
                aboutName: form.aboutName,
                mission: form.mission,
                vision: form.vision,
                imageUrl:form.imageUrl,
            }

            // Response
            let res;
            // Eğer formda resim yüklenmişse api'ye gönder
            if(form.imageFile){
                const fd= new FormData();
                // AboutApiImpl
                /*
                @RequestPart("about") String json, // <-- JSON string
                @RequestPart(value = "file", required = false) MultipartFile file) // <-- dosya parçası (adı */
                fd.append("about", new Blob([JSON.stringify(dto)], {type:"application/json"}));
                fd.append("file", form.imageFile);
                res = await axios.post(`${API_BASE}${ENDPOINTS.ABOUT.UPDATE(selectedAbout.aboutId || selectedAbout.id )}`, fd, {headers:{"Content-Type":"multipart/form-data"}})
            }else{ //Eğer resim seçilmemişse
                res = await axios.post(`${API_BASE}${ENDPOINTS.ABOUT.CREATE}`,dto)
            }

            showSuccess("Hakkımızda başarıyla güncellendi");
            setShowCreate(false);
            // Listeyi tazelesin
            fetchAbouts()
        }catch (e) {
            showError("Hakkımızda güncellenemedi"+ (err.response?.data?.message || ""));
            setFormError(err.response?.data?.errors || {});
        }

        // Spinner kapat
        setSpinner(false);
    }



    // RETURN
    return <React.Fragment>

        {/*Toast*/}
        <ReusableToast/>

       <div className="container py-4">
           <h2 className="text-center mb-4">About/ Hakkımızda Listesi</h2>
           <button className="btn btn-primary mb-3" onClick={openCreateModal}>
               Yeni kayıt ekle
           </button>

           <table className="table table-border table-striped">
               <thead>
               <tr>
                   <th>ID</th>
                   <th>About Name</th>
                   <th>Misyon</th>
                   <th>Vizyon</th>
                   <th>Görsel</th>
                   <th>Oluşturma</th>
                   <th>İşlem</th>
               </tr>
               </thead>
               <tbody>
               {/*eğer About Listsinden veri yoksa*/}
               {abouts.length === 0 && (
                   <tr colspan={7} className="text-center text-muted">
                       Kayıt Bulunamadı
                   </tr>
               )}

               {/*eğer About Listsinden veri varsa*/}
               {abouts.map((temp) => (
                   <tr key={temp.aboutId || about.id } >
               <td> {temp.aboutName}</td>
               <td> {temp.mission}</td>
               <td> {temp.vision}</td>
               <td> {temp.imageUrl ? (
                   <img src={resolveImageUrl(temp.imageUrl)} alt="about" style={{maxWidth:80, maxHeight:60, borderRadius:6, boxShadow:"0 1px 8px rgba(0,0,0,0.06)"}}/>
               ) : (
                   <span className="text-muted small">RESİM YOK</span>
               )}
               </td>
                       <td>{formatDate(temp.systemCreatedDate)}</td>
                       <td>
                           <button className="btn btn-sm btn-outline-secondary me-1" onClick={()=>openViewModal(temp)} title="Detay">
                               <i className="fa fa-eye" />
                           </button>

                           <button className="btn btn-sm btn-outline-primary me-1" onClick={()=>openEditModal(temp)} title="Düzenle">
                               <i className="fa fa-pen" />
                           </button>

                           <button className="btn btn-sm btn-outline-danger me-1" onClick={()=>openDeleteModal(temp)} title="Detay">
                               <i className="fa fa-trash" />
                           </button>
                       </td>
                   </tr>
                   ))}
               </tbody>
           </table>

           {/*CREATE MODAL*/}
           {showCreate && (
               <div className="modal fade show d-block" tabIndex={-1}>
                   <div className="modal-dialog">
                       <div className="modal-content">
                           <form onSubmit={handleCreate} encType="multipart/form-data">
                               <div className="modal-header">
                                   <h5 className="modal-title">Yeni Kayıt Ekle</h5>
                                   <button type="button" className="btn-close" onClick={() => setShowCreate(false)}></button>
                               </div>
                               <div className="modal-body">
                                   <div className="mb-3">
                                       <label className="form-label">About Name</label>
                                       <input type="text" className={`form-control ${formError.aboutName ? "is-invalid" : ""}`} name="aboutName" value={form.aboutName} onChange={handleFormChange} required />
                                       {formError.aboutName && <div className="invalid-feedback">{formError.aboutName}</div>}
                                   </div>
                                   <div className="mb-3">
                                       <label className="form-label">Misyon</label>
                                       <textarea className={`form-control ${formError.mission ? "is-invalid" : ""}`} name="mission" value={form.mission} onChange={handleFormChange} required />
                                       {formError.mission && <div className="invalid-feedback">{formError.mission}</div>}
                                   </div>
                                   <div className="mb-3">
                                       <label className="form-label">Vizyon</label>
                                       <textarea className={`form-control ${formError.vision ? "is-invalid" : ""}`} name="vision" value={form.vision} onChange={handleFormChange} required />
                                       {formError.vision && <div className="invalid-feedback">{formError.vision}</div>}
                                   </div>
                                   <div className="mb-3">
                                       <label className="form-label">Görsel</label>
                                       <input type="file" className="form-control" name="imageFile" onChange={handleFormChange} accept="image/*" />
                                       {form.imageFile && (
                                           <img src={URL.createObjectURL(form.imageFile)} alt="Önizleme" className="mt-2 rounded" style={{ maxHeight: 80, maxWidth: 140 }} />
                                       )}
                                   </div>
                               </div>
                               <div className="modal-footer">
                                   <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>
                                       Kapat
                                   </button>
                                   <button type="submit" className="btn btn-primary" disabled={spinner}>
                                       {spinner && <span className="spinner-border spinner-border-sm me-1"></span>}
                                       Kaydet
                                   </button>
                               </div>
                           </form>
                       </div>
                   </div>
                   <div className="modal-backdrop fade show"></div>
               </div>
           )}

           {/* EDIT MODAL */}
           {showEdit && (
               <div className="modal fade show d-block" tabIndex={-1}>
                   <div className="modal-dialog">
                       <div className="modal-content">
                           <form onSubmit={handlEdit} encType="multipart/form-data">
                               <div className="modal-header">
                                   <h5 className="modal-title">Kaydı Düzenle</h5>
                                   <button type="button" className="btn-close" onClick={() => setShowEdit(false)}></button>
                               </div>
                               <div className="modal-body">
                                   <div className="mb-3">
                                       <label className="form-label">About Name</label>
                                       <input type="text" className={`form-control ${formError.aboutName ? "is-invalid" : ""}`} name="aboutName" value={form.aboutName} onChange={handleFormChange} required />
                                       {formError.aboutName && <div className="invalid-feedback">{formError.aboutName}</div>}
                                   </div>
                                   <div className="mb-3">
                                       <label className="form-label">Misyon</label>
                                       <textarea className={`form-control ${formError.mission ? "is-invalid" : ""}`} name="mission" value={form.mission} onChange={handleFormChange} required />
                                       {formError.mission && <div className="invalid-feedback">{formError.mission}</div>}
                                   </div>
                                   <div className="mb-3">
                                       <label className="form-label">Vizyon</label>
                                       <textarea className={`form-control ${formError.vision ? "is-invalid" : ""}`} name="vision" value={form.vision} onChange={handleFormChange} required />
                                       {formError.vision && <div className="invalid-feedback">{formError.vision}</div>}
                                   </div>
                                   <div className="mb-3">
                                       <label className="form-label">Görsel</label>
                                       <input type="file" className="form-control" name="imageFile" onChange={handleFormChange} accept="image/*" />
                                       {form.imageFile ? (
                                           <img src={URL.createObjectURL(form.imageFile)} alt="Önizleme" className="mt-2 rounded" style={{ maxHeight: 80, maxWidth: 140 }} />
                                       ) : (
                                           form.imageUrl &&
                                           <img src={resolveImageUrl(form.imageUrl)} alt="Önceki" className="mt-2 rounded" style={{ maxHeight: 80, maxWidth: 140 }} />
                                       )}
                                   </div>
                               </div>
                               <div className="modal-footer">
                                   <button type="button" className="btn btn-secondary" onClick={() => setShowEdit(false)}>
                                       Kapat
                                   </button>
                                   <button type="submit" className="btn btn-primary" disabled={spinner}>
                                       {spinner && <span className="spinner-border spinner-border-sm me-1"></span>}
                                       Kaydet
                                   </button>
                               </div>
                           </form>
                       </div>
                   </div>
                   <div className="modal-backdrop fade show"></div>
               </div>
           )}

           {/* VIEW MODAL */}
           {showView && selectedAbout && (
               <div className="modal fade show d-block" tabIndex={-1}>
                   <div className="modal-dialog">
                       <div className="modal-content">
                           <div className="modal-header">
                               <h5 className="modal-title">Kayıt Detay</h5>
                               <button type="button" className="btn-close" onClick={() => setShowView(false)}></button>
                           </div>
                           <div className="modal-body">
                               <div><strong>ID:</strong> {selectedAbout.aboutId || selectedAbout.id}</div>
                               <div><strong>About Name:</strong> {selectedAbout.aboutName}</div>
                               <div><strong>Misyon:</strong> {selectedAbout.mission}</div>
                               <div><strong>Vizyon:</strong> {selectedAbout.vision}</div>
                               <div><strong>Görsel:</strong><br />
                                   {selectedAbout.imageUrl ? (
                                       <img src={resolveImageUrl(selectedAbout.imageUrl)} alt="about" style={{ maxHeight: 100, maxWidth: 200, borderRadius: 8 }} />
                                   ) : <span className="text-muted small">RESİM YOK</span>}
                               </div>
                               <div><strong>Oluşturma:</strong> {formatDate(selectedAbout.systemCreatedDate)}</div>
                           </div>
                           <div className="modal-footer">
                               <button className="btn btn-secondary" onClick={() => setShowView(false)}>
                                   Kapat
                               </button>
                           </div>
                       </div>
                   </div>
                   <div className="modal-backdrop fade show"></div>
               </div>
           )}

           {/* DELETE MODAL */}
           {showDelete && selectedAbout && (
               <div className="modal fade show d-block" tabIndex={-1}>
                   <div className="modal-dialog">
                       <div className="modal-content">
                           <div className="modal-header">
                               <h5 className="modal-title text-danger">Silme Onayı</h5>
                               <button type="button" className="btn-close" onClick={() => setShowDelete(false)}></button>
                           </div>
                           <div className="modal-body">
                               <div>
                                   <b>{selectedAbout.aboutName}</b> başlıklı kaydı silmek istediğinize emin misiniz?
                               </div>
                               <div className="mt-2 text-muted">
                                   <strong>ID:</strong> {selectedAbout.aboutId || selectedAbout.id}
                               </div>
                           </div>
                           <div className="modal-footer">
                               <button className="btn btn-secondary" onClick={() => setShowDelete(false)}>
                                   Vazgeç
                               </button>
                               <button className="btn btn-danger" onClick={handleDelete} disabled={spinner}>
                                   {spinner && <span className="spinner-border spinner-border-sm me-1"></span>}
                                   Sil
                               </button>
                           </div>
                       </div>
                   </div>
                   {/* Modal backdrop */}
                   <div className="modal-backdrop fade show"></div>
               </div>
           )}

       </div>  {/*end container*/}
    </React.Fragment>;
}

// I18N
export default About;
