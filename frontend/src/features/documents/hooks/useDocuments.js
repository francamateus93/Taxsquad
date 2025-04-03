import jsPDF from "jspdf";
import emailjs from "emailjs-com";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuarterlyTax } from "../../../store/slices/quarterlyTaxSlice.js";
import { fetchAnnualTax } from "../../../store/slices/annualTaxSlice.js";
import { deleteQuarterlyTax } from "../../../store/slices/quarterlyTaxSlice.js";
import { deleteAnnualTax } from "../../..//store/slices/annualTaxSlice.js";

export const useDocuments = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const user = useSelector((state) => state.auth.user);
  const userEmail = useSelector((state) => state.auth.user.email);
  const {
    quarterlyTax,
    loading: loadingQuarterly,
    error: errorQuarterly,
  } = useSelector((state) => state.quarterlyTax);
  const {
    annualTax,
    loading: loadingAnnual,
    error: errorAnnual,
  } = useSelector((state) => state.annualTax);

  const [documentType, setDocumentType] = useState("quarterly");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    if (!userId) return;
    if (documentType === "quarterly") {
      dispatch(fetchQuarterlyTax({ userId }));
    } else {
      dispatch(fetchAnnualTax({ userId }));
    }
  }, [dispatch, userId, documentType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [documentType, dateFilter]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const data = documentType === "quarterly" ? quarterlyTax : annualTax;
  const loading =
    documentType === "quarterly" ? loadingQuarterly : loadingAnnual;
  const error = documentType === "quarterly" ? errorQuarterly : errorAnnual;

  const filteredDocuments = data
    .filter((doc) => !dateFilter || doc.date >= dateFilter)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDocuments = filteredDocuments.slice(
    startIndex,
    currentPage + itemsPerPage
  );

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleDownload = (doc) => {
    const docPDF = new jsPDF();
    docPDF.text(`Document Type: ${documentType}`, 10, 10);
    docPDF.text(`Year: ${doc.year}`, 10, 20);
    if (documentType === "quarterly") {
      docPDF.text(`Quarter: ${doc.quarter}`, 10, 30);
    }
    docPDF.text(
      `Created At: ${new Date(doc.created_at).toLocaleDateString()}`,
      10,
      40
    );
    docPDF.save(`${documentType}-document-${doc.year}.pdf`);
  };

  const handleEmail = (doc) => {
    emailjs
      .send(
        "SERVICE_ID",
        "TEMPLATE_ID",
        {
          document_type: documentType,
          year: doc.year,
          quarter: doc.quarter || "N/A",
          created_at: new Date(doc.created_at).toLocaleDateString(),
          to_email: userEmail,
        },
        "USER_ID"
      )
      .then(() => alert("Document sent successfully!"))
      .catch((error) => {
        console.error(error);
        alert("Failed to send document by email.");
      });
  };

  const handleConfirmDelete = (doc) => {
    setSelectedDoc(doc);
    setShowModalDelete(true);
  };

  const handleDelete = () => {
    dispatch(
      documentType === "quarterly"
        ? deleteQuarterlyTax({ userId, quarterlyId: selectedDoc.id })
        : deleteAnnualTax({ userId, annualId: selectedDoc.id })
    )
      .unwrap()
      .then(() => {
        setShowModalDelete(false);
        setSelectedDoc(null);
      })
      .catch((error) => console.error(error));
  };

  return {
    documentType,
    setDocumentType,
    dateFilter,
    setDateFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    openMenuId,
    setOpenMenuId,
    menuRef,
    data,
    loading,
    error,
    filteredDocuments,
    totalPages,
    currentDocuments,
    toggleMenu,
    handleDownload,
    handleEmail,
    handleConfirmDelete,
    handleDelete,
    showModalDelete,
    setShowModalDelete,
    selectedDoc,
    setSelectedDoc,
  };
};
