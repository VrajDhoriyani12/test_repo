"use client";

import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Row, Col, Card, InputGroup } from "react-bootstrap";
import EmojiPicker from "emoji-picker-react";
import { Controller, useForm } from "react-hook-form";
import { activeLanguageApi, addWhatsappTemplateApi, validateNoWhiteSpace } from "@/app/(components)/Configs/Utils/APIs/Admin_Apis";
import Select from "react-select";
import { toast } from "react-toastify";
import PhoneInput from 'react-phone-input-2';
import { useRouter } from "next/navigation";

const WhatsappTemplateForm = () => {

  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, setValue, reset, watch, control } = useForm()
  const [message, setMessage] = useState("");
  const [footerText, setFooterText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [languageListing, setLanguageListing] = useState<any>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const templateNameRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);
  const languageRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLInputElement | null>(null);


  const [selectedPlaceholders, setSelectedPlaceholders] = useState<string[]>(
    []
  );
  const [placeholderValues, setPlaceholderValues] = useState<
    Record<string, string>
  >({});

  const activeLanguage = async () => {
    setLoading(true)

    const response = await activeLanguageApi()
    if (response.status === 200) {

      const languageOption = response.data.language.map((item: any) => ({
        value: item?.id,
        label: item?.name,
      }))

      setLanguageListing(languageOption)

      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    activeLanguage()
  }, [])

  const insertPlaceholder = (value: string): void => {
    if (!value || selectedPlaceholders.includes(value)) return;
    setSelectedPlaceholders((prev) => [...prev, value]);
    setPlaceholderValues((prev) => ({ ...prev, [value]: "" }));
    const placeholder = `{{${value}}}`;
    const newMessage = message + placeholder;
    setMessage(newMessage);
  };

  const handleInputChange = (key: string, val: string): void => {
    setPlaceholderValues((prev) => ({ ...prev, [key]: val }));
  };

  useEffect(() => {
    const matches = message.match(/{{(F\d+)}}/g) || [];
    const uniquePlaceholders = Array.from(
      new Set(matches.map((match) => match.replace(/[{}]/g, "")))
    );

    setSelectedPlaceholders((prev) =>
      prev.filter((ph) => uniquePlaceholders.includes(ph))
    );

    setPlaceholderValues((prev) => {
      const newValues: Record<string, string> = {};
      uniquePlaceholders.forEach((ph) => {
        newValues[ph] = prev[ph] || "";
      });
      return newValues;
    });
  }, [message]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [marketingType, setMarketingType] = useState("");
  const [templateFormat, setTemplateFormat] = useState("");

  const [mediaType, setMediaType] = useState("document");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaUrl = watch('media_url');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      // Clear media URL when a file is selected
      setValue('media_url', '');

      // Check file size and type
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File size should be less than 5MB.");
        setMediaFile(null);
      } else if (
        !["image/jpeg", "image/png", "video/mp4", "application/pdf"].includes(
          file.type
        )
      ) {
        setError(
          "Invalid file type. Please select a valid image, video, or document."
        );
        setMediaFile(null);
      } else {
        setError(null);
        setMediaFile(file);
      }
    }
  };

  useEffect(() => {
    if (mediaUrl) {
      setMediaFile(null);
      setError(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [mediaUrl]);

  const templateType = watch('template_type');
  useEffect(() => {
    if (templateType === 'Text') {
      // Clear media-related fields when switching to Text
      setValue('media_url', '');
      setMediaFile(null);
      setError(null);
    }

    if (templateType === 'Media') {
      // Clear header_text when switching to Media
      setValue('header_text', '');
    }
  }, [templateType, setValue]);

  const categoryType = watch('category_type');
  useEffect(() => {
    if (categoryType === 'Utility') {
      setMarketingType('')
      setTemplateFormat('')
    }
  }, [categoryType, setValue])

  const handleRemoveFile = () => {
    setMediaFile(null);
    setError(null);

    // Clear the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  type ButtonType = "quick_reply" | "website" | "phone" | "copy_code";

  interface ButtonConfig {
    id: string;
    type: ButtonType;
  }

  const [buttons, setButtons] = useState<ButtonConfig[]>([]);

  const addButton = (type: ButtonType) => {
    const max = {
      quick_reply: 2,
      website: 2,
      phone: 1,
      copy_code: 1,
    };

    const typeCount = buttons.filter((b) => b.type === type).length;
    if (type in max && typeCount >= max[type]) return;

    setButtons((prev) => [...prev, { id: `${type}-${Date.now()}`, type }]);
    setDropdownOpen(false);
  };

  const removeButton = (id: string) => {
    setButtons((prev) => prev.filter((b) => b.id !== id));
  };

  const handleSelect = (e: any) => {
    const selectedText = e.target.value.substring(
      e.target.selectionStart,
      e.target.selectionEnd
    );
    setSelectedText(selectedText);
  };

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText =
      message.substring(0, start) + emoji + message.substring(end);

    setMessage(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  const applyFormat = (format: string) => {
    if (!selectedText) return;
    let formatted = selectedText;

    switch (format) {
      case "bold":
        formatted = `*${selectedText}*`;
        break;
      case "italic":
        formatted = `_${selectedText}_`;
        break;
      case "strike":
        formatted = `~${selectedText}~`;
        break;
      case "mono":
        formatted = `\`\`\`${selectedText}\`\`\``;
        break;
    }

    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newText =
      message.substring(0, start) + formatted + message.substring(end);

    setMessage(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + formatted.length,
        start + formatted.length
      );
    }, 0);
  };

  const onsubmit = async (data: any) => {
    console.log("🚀 ~ data:", data)
    setSubmitLoading(true)

    const hasEmptyPlaceholder = Object.values(placeholderValues).some((value) =>
      value.trim() === ""
    )

    const templateNamePattern = /^[a-z0-9_]+$/;
    if (data?.template_name === '') {
      toast.error("You have not entered template name");
      templateNameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      templateNameRef.current?.focus();

      setSubmitLoading(false)
      return;
    } else if (!templateNamePattern.test(data.template_name)) {
      toast.error("Template name must contain only lowercase letters, numbers, and underscores (_)");
      templateNameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      templateNameRef.current?.focus();

      setSubmitLoading(false);
      return;
    } else if (data.category_type === '') {
      toast.error("You have not selected category")
      categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      categoryRef.current?.focus();

      setSubmitLoading(false)
      return;
    } else if (data.language === undefined) {
      toast.error("You have not entered language");
      languageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = languageRef.current?.querySelector('input');
      input?.focus();

      setSubmitLoading(false)
      return;
    } else if (message === '') {
      toast.error("You have not entered template message")
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      textareaRef.current?.focus();

      setSubmitLoading(false)
      return;
    } else if (hasEmptyPlaceholder) {
      toast.error('Please fill all placeholder values.')

      setSubmitLoading(false)
      return;
    } else {
      const formData = new FormData()
      formData.append('template_name', data.template_name)
      formData.append('category', data.category_type)
      formData.append('type_of_marketing_template', marketingType ?? '')
      formData.append('template_format', templateFormat ?? '')
      formData.append('language_id', data.language?.value ?? '')
      formData.append('header_template_type', data.template_type ?? '')
      formData.append('header_text', data.header_text ?? '')
      if (data.template_type === "Media") {
        const selectedMediaType = mediaType.toLowerCase();

        // Map mediaType to field names
        const mediaFieldMapping: Record<string, string> = {
          document: 'header_media_url',
          image: 'header_image_filename',
          video: 'header_video_filename',
        }

        // Handle Document/Image/Video
        if (['document', 'image', 'video'].includes(selectedMediaType)) {
          const isFileUpload = mediaFile !== null;

          if (isFileUpload) {
            const fieldName = mediaFieldMapping[selectedMediaType];
            formData.append(fieldName, mediaFile as File); // File upload
            formData.append('header_media_url_text', '');  // URL is empty if file exists

            // Append empty strings for other media types NOT selected
            Object.entries(mediaFieldMapping).forEach(([type, field]) => {
              if (type !== selectedMediaType) {
                formData.append(field, '');
              }
            });
          } else {
            formData.append('header_media_url_text', data.media_url ?? '');

            // Append empty strings for all media file fields
            Object.values(mediaFieldMapping).forEach(field => {
              formData.append(field, '');
            });
          }
        }

        // Handle Location
        if (selectedMediaType === 'location') {
          formData.append('header_location', '');
        } else {
          formData.append('header_location', '');
        }

        // Handle Carousel
        if (selectedMediaType === 'carousel') {
          formData.append('header_carousel_items', '');
        } else {
          formData.append('header_carousel_items', '');
        }
      }
      // formData.append('header_media_url_text', data.media_url ?? '')
      // formData.append('header_media_url', '')
      // formData.append('header_image_filename', '')
      // formData.append('header_video_filename', '')
      // formData.append('header_location', '')
      // formData.append('header_carousel_items', '')
      // formData.append('body_message', '')
      // formData.append('footer_text', '')
      formData.append('custom_button[0][text]', data.quick_reply_text ?? '')
      formData.append('visit_website_button[0][text]', data.visit_website_text ?? '')
      formData.append('visit_website_button[0][type]', data.visit_website_type ?? '')
      formData.append('visit_website_button[0][value]', data.visit_website_url ?? '')
      formData.append('call_phone_number_button[0][text]', data.call_phone_number_text ?? '')
      formData.append('call_phone_number_button[0][country_code]', countryCode ?? '')
      formData.append('call_phone_number_button[0][contact]', phone ?? '')
      formData.append('copy_offer_code_button[0][text]', 'Copy Code')
      formData.append('copy_offer_code_button[0][code]', data.copy_offer_code_text ?? '')

      selectedPlaceholders.forEach((placeholder, index) => {
        formData.append(`body_placeholders[${index}]`, placeholder ?? '');
      });

      const values = Object.values(placeholderValues);
      values.forEach((value, index) => {
        formData.append(`body_placeholders_value[${index}]`, value ?? '');
      });

      const response = await addWhatsappTemplateApi(formData)
      console.log("🚀 ~ response:", response)
      if (response.status === 201) {
        router.push('/broadcasting/whatsapp-template/')
        setSubmitLoading(false)
        reset()
      } else {
        setSubmitLoading(false)
        if (response.response?.status === 400 || response.response?.status === 422 || response.response?.status === 404 || response.response?.status === 500) {
          toast.error(response.response?.data.message);
        } else {
          toast.error(response.response?.data.message);
        }
      }

      // formData.append('buttons[0][name]', 'Custom')
      // formData.append('buttons[0][value]', data.quick_reply_text)
      // formData.append('buttons[1][name]', 'Visit website')
      // formData.append('buttons[1][text]', data.visit_website_text)
      // formData.append('buttons[1][type]', data.visit_website_type)
      // formData.append('buttons[1][value]', data.visit_website_url)
      // formData.append('buttons[2][name]', 'Call phone number')
      // formData.append('buttons[2][text]', data.call_phone_number_text)
      // formData.append('buttons[2][country_code]', countryCode)
      // formData.append('buttons[2][contact]', phone)
      // formData.append('buttons[3][name]', 'Call phone number')
      // formData.append('buttons[3][text]', 'Copy Code')
      // formData.append('buttons[3][value]', data.copy_offer_code_text)
    }
  }

  return (
    <div className="container py-4">
      <h4 className="mb-3">Whatsapp ➜ Whatsapp Templates</h4>

      <Card className="p-3">
        <h5 className="text-primary mb-3">📄 Whatsapp Template Form</h5>

        <Row>
          {/* Left Side Form */}
          <Col md={8}>
            <Form onSubmit={handleSubmit(onsubmit)}>
              {/* Template Name */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Template name : <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control placeholder="Enter template name" {...register('template_name')}
                  ref={(e: any) => {
                    register('template_name').ref(e);
                    templateNameRef.current = e;
                  }} />
                <small className="text-danger">
                  Template name can only contain lowercase alphanumeric
                  characters and underscores (_). No other characters or white
                  space are allowed.
                </small>
                <p className='text-danger'>{errors.template_name && <p>Template Name is required</p>}</p>
              </Form.Group>

              {/* Category */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Category : <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select {...register('category_type')}
                  ref={(e: any) => {
                    register('category_type').ref(e);
                    categoryRef.current = e;
                  }}>
                  <option value=''>--Select--</option>
                  <option>Marketing</option>
                  <option>Utility</option>
                </Form.Select>
                <p className="text-danger">{errors.category_type && <p>Category is required</p>}</p>
              </Form.Group>

              {/* Type of Marketing Template (conditional rendering) */}
              {watch('category_type') === "Marketing" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Type of marketing template:</Form.Label>
                    <Form.Check
                      type="radio"
                      label="Custom"
                      value="custom"
                      checked={marketingType === "custom"}
                      onChange={(e) => setMarketingType(e.target.value)}
                      className="marketing-check-box"
                    />
                    <p className="small">
                      Send promotional offers, announcements and more to
                      increase awareness and engagement
                    </p>
                    <Form.Check
                      type="radio"
                      label="Product Messages"
                      value="Product Message"
                      checked={marketingType === "Product Message"}
                      onChange={(e) => setMarketingType(e.target.value)}
                      className="marketing-check-box"
                    />
                    <p className="small">
                      Send message about your entire catalogue or multiple
                      product from it
                    </p>
                  </Form.Group>

                  {/* Template Format (conditional rendering) */}
                  {marketingType === "Product Message" && (
                    <Form.Group className="mb-3">
                      <Form.Label>Template format:</Form.Label>
                      <Form.Check
                        type="radio"
                        label="Catalogue message"
                        value="Catalogue message"
                        checked={templateFormat === "Catalogue message"}
                        onChange={(e) => setTemplateFormat(e.target.value)}
                        className="marketing-check-box"
                      />
                      <p className="small">
                        Include the entire catalogue to give your users a
                        comprehensive view of all of your products
                      </p>
                      <Form.Check
                        type="radio"
                        label="Multi-product messages"
                        value="Multi-product messages"
                        checked={templateFormat === "Multi-product messages"}
                        onChange={(e) => setTemplateFormat(e.target.value)}
                        className="marketing-check-box"
                      />
                      <p className="small">
                        Include upto 30 products from the catalogue. Useful for
                        showcasing new collection or a specific product category
                      </p>
                    </Form.Group>
                  )}
                </>
              )}

              {/* Language */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Language : <span className="text-danger">*</span>
                </Form.Label>
                <Controller
                  name='language'
                  control={control}
                  render={({ field }) => (
                    <div ref={languageRef}>
                      <Select {...field} options={languageListing} />
                    </div>
                  )}
                />
              </Form.Group>

              <hr />

              <h6 className="fw-bold">Header optional</h6>
              <p className="text-muted small">
                Add a title or choose which type of media you'll use for this
                header. Your title can't include more than one variable.
              </p>
              {/* Template Type Selection */}
              <Form.Group className="mb-3">
                <Form.Label>Template type:</Form.Label>
                <Form.Select
                  {...register('template_type', { required: true, validate: validateNoWhiteSpace })}
                >
                  <option value="None">None</option>
                  <option value="Text">Text</option>
                  <option value="Media">Media</option>
                </Form.Select>
                <p className="text-danger">{errors.template_type && <p>Template Type is required</p>}</p>
              </Form.Group>

              {/* Conditionally render based on selected template type */}
              {watch('template_type') === "Text" && (
                <Form.Group className="mb-3">
                  <Form.Label>Text:</Form.Label>
                  <Form.Control
                    maxLength={60}
                    placeholder="Enter text"
                    {...register('header_text', { required: true, validate: validateNoWhiteSpace })}
                  />
                  <p className="text-danger">{errors.header_text && <p>Template Text is required</p>}</p>
                </Form.Group>
              )}

              {watch('template_type') === "Media" && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Media type:</Form.Label>
                    <div className="d-flex gap-3 flex-wrap">
                      {[
                        "document",
                        "image",
                        "video",
                        "location",
                        "carousel",
                      ].map((type) => (
                        <Form.Check
                          key={type}
                          type="radio"
                          name="mediaType"
                          label={type.charAt(0).toUpperCase() + type.slice(1)}
                          value={type}
                          checked={mediaType === type}
                          onChange={(e) => setMediaType(e.target.value)}
                          className="marketing-check-box"
                        />
                      ))}
                    </div>
                    <p className="small">
                      Image: jpeg, png; Video: mp4; Document: .pdf, Maximum file
                      size should be 5MB
                    </p>
                  </Form.Group>

                  {(mediaType === "document" ||
                    mediaType === "image" ||
                    mediaType === "video") && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>Media URL:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Image/Pdf and video URL, it should be https URL for example: https://domainame/imagename"
                            {...register('media_url')}
                            maxLength={2000}
                          />
                          {/* <p className="text-danger">{errors.media_url && <p>Media URL is required</p>}</p> */}
                          <small className="d-flex justify-content-end">{watch('media_url')?.length || 0}/2000</small>
                        </Form.Group>
                        <div className="divider">
                          <span>OR UPLOAD</span>
                        </div>

                        <Form.Group className="mb-3">
                          <Form.Label>OR UPLOAD:</Form.Label>
                          <InputGroup>
                            <Form.Control type="file" onChange={handleFileChange} ref={fileInputRef} />
                            <div className="input-group-append">
                              <Button
                                variant="outline-danger"
                                onClick={handleRemoveFile}
                                disabled={!mediaFile}
                              >
                                Remove
                              </Button>
                            </div>
                          </InputGroup>

                          {error && (
                            <div className="text-danger mt-2">
                              <strong>Error:</strong> {error}
                            </div>
                          )}

                          {mediaFile && (
                            <div className="mt-2">
                              <strong>Selected File:</strong> {mediaFile.name}
                            </div>
                          )}
                        </Form.Group>
                      </>
                    )}
                </>
              )}

              <hr />

              {/* Body */}
              <h6 className="fw-bold">Body</h6>
              <Form.Group className="mb-3">
                <Form.Label>Placeholders:</Form.Label>
                <Form.Select
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    insertPlaceholder(`F${e.target.value}`)
                  }
                >
                  <option value="">--Select--</option>
                  {[...Array(10)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      F{index + 1}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Message : <span className="text-danger">*</span>
                </Form.Label>

                {/* Formatting Buttons */}
                <div className="mb-2 d-flex gap-2">
                  <div className="position-relative">
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => setShowEmojiPicker((val) => !val)}
                      title="Add Emoji"
                    >
                      😊
                    </Button>

                    {showEmojiPicker && (
                      <div style={{ position: "absolute", zIndex: 1000 }}>
                        <EmojiPicker
                          onEmojiClick={(emojiData) => {
                            insertEmoji(emojiData.emoji);
                            setShowEmojiPicker(false);
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => applyFormat("bold")}
                    disabled={!selectedText}
                  >
                    <strong>B</strong>
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => applyFormat("italic")}
                    disabled={!selectedText}
                  >
                    <em>I</em>
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => applyFormat("strike")}
                    disabled={!selectedText}
                  >
                    <s>S</s>
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => applyFormat("mono")}
                    disabled={!selectedText}
                  >
                    <code>M</code>
                  </Button>
                </div>

                {/* Textarea */}
                <Form.Control
                  as="textarea"
                  rows={4}
                  maxLength={1024}
                  placeholder="Enter template message"
                  value={message}
                  ref={textareaRef}
                  onSelect={handleSelect}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <small className="d-flex justify-content-end">{message.length}/1024</small>
              </Form.Group>

              <hr />

              {/* Footer */}
              <h6 className="fw-bold">Footer optional</h6>
              <p className="text-muted small">
                Add a short line of text to the bottom of your message template.
              </p>
              <Form.Control placeholder="Enter text" maxLength={60} onChange={(e) => setFooterText(e.target.value)} />
              <small className="d-flex justify-content-end">{footerText.length}/60</small>

              <hr />

              {/* Buttons */}
              <h6 className="fw-bold mt-3">Buttons optional</h6>
              <p className="text-muted small">
                Create buttons that let customers respond to your message or
                take action.
              </p>

              <Form.Group className="mb-3 row">
                <div className="col-xxl-2 col-lg-6 col-md-6">
                  <Form.Label className="mb-0">Button type :</Form.Label>
                </div>
                <div className="col-xxl-3 col-lg-6 col-md-6">
                  <div className="btn-group">
                    <Button
                      variant="success"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      Add buttons
                    </Button>
                    <Button
                      variant="success"
                      className="dropdown-toggle dropdown-toggle-split"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span className="visually-hidden">Toggle Dropdown</span>
                    </Button>
                    {dropdownOpen && (
                      <ul className="dropdown-menu show mt-5">
                        <li className="dropdown-header">Quick reply buttons</li>
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              addButton("quick_reply");
                              setDropdownOpen(false);
                            }}
                          >
                            Custom
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li className="dropdown-header">
                          Call to action buttons
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              addButton("website");
                              setDropdownOpen(false);
                            }}
                          >
                            Visit Website{" "}
                            <small className="text-muted">
                              2 buttons maximum
                            </small>
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              addButton("phone");
                              setDropdownOpen(false);
                            }}
                          >
                            Call Phone Number{" "}
                            <small className="text-muted">1 button maximum</small>
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              addButton("copy_code");
                              setDropdownOpen(false);
                            }}
                          >
                            Copy Offer Code{" "}
                            <small className="text-muted">1 button maximum</small>
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className="col-xxl-4 col-lg-6 col-md-12">
                  <strong>Valid groupings</strong>
                  <ul className="small text-secondary valid-invalid-message">
                    <li>Quick Reply, Quick Reply</li>
                    <li>Quick Reply, Quick Reply, URL, Phone</li>
                    <li>URL, Phone, Quick Reply, Quick Reply</li>
                  </ul>
                </div>
                <div className="col-xxl-3 col-lg-6 col-md-12">
                  <strong>Invalid groupings</strong>
                  <ul className="small text-secondary valid-invalid-message">
                    <li>Quick Reply, URL, Quick Reply</li>
                    <li>URL, Quick Reply, URL</li>
                  </ul>
                </div>
              </Form.Group>

              {buttons.map((button, index) => {
                switch (button.type) {
                  case "quick_reply":
                    return (
                      <div className="row" key={index}>
                        <div className="col-xl-2">
                          <Form.Label
                            className="mb-0 flex-grow-1"
                            style={{ width: "150px", lineHeight: "3" }}
                          >
                            Quick reply
                          </Form.Label>
                        </div>
                        <div className="col-xl-9">
                          <Form.Control
                            maxLength={25}
                            placeholder="Enter button text"
                            {...register('quick_reply_text')}
                          />
                          <small className="d-flex justify-content-end">{watch('quick_reply_text')?.length || 0}/25</small>
                        </div>
                        <div className="col-xl-1">
                          <Button
                            variant="danger"
                            onClick={() => {
                              removeButton(button.id);
                              setValue('quick_reply_text', '')
                            }}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    );
                  case "website":
                    return (
                      <div className="row mt-2" key={index}>
                        <div className="col-xl-2">
                          <Form.Label
                            className="mb-0 flex-grow-1"
                            style={{ width: "150px" }}
                          >
                            Visit website
                          </Form.Label>
                        </div>
                        <div className="col-xl-3">
                          <div>
                            <Form.Control
                              maxLength={25}
                              placeholder="Enter button text"
                              {...register('visit_website_text')}
                            />
                            <small className="d-flex justify-content-end">{watch('visit_website_text')?.length || 0}/25</small>
                          </div>
                        </div>
                        <div className="col-xl-2">
                          <Form.Select style={{ width: "auto" }} {...register('visit_website_type')}>
                            <option value="Static">Static</option>
                            <option value="Dynamic">Dynamic</option>
                          </Form.Select>
                        </div>
                        <div className="col-xl-4">
                          <Form.Control placeholder="https://yourdomainname.com" maxLength={2000} {...register('visit_website_url')} />
                          <small className="d-flex justify-content-end">{watch('visit_website_url')?.length || 0}/2000</small>
                        </div>
                        <div className="col-xl-1">
                          <Button
                            variant="danger"
                            onClick={() => {
                              removeButton(button.id);
                              setValue('visit_website_text', '')
                              setValue('visit_website_type', '')
                              setValue('visit_website_url', '')
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    );
                  case "phone":
                    return (
                      <div className="row mt-2" key={index}>
                        <div className="col-xl-2">
                          <Form.Label
                            className="mb-0 flex-grow-1"
                            style={{ width: "150px" }}
                          >
                            Call phone number
                          </Form.Label>
                        </div>
                        <div className="col-xl-3">
                          <Form.Control
                            maxLength={25}
                            placeholder="Enter button text"
                            {...register('call_phone_number_text')}
                          />
                          <small className="d-flex justify-content-end">{watch('call_phone_number_text')?.length || 0}/25</small>
                        </div>
                        <div className="col-xl-6">
                          {/* <Form.Control placeholder="Enter phone number with country code" /> */}
                          <PhoneInput
                            // name="phoneNumber"
                            // autoFocus={true}
                            // id="filled-basic"
                            // variant="filled"
                            placeholder='Phone number'
                            country={"in"}
                            onChange={(value: any, country: any) => {
                              setCountryCode(country.dialCode)
                              const onlyMobileNumber = value.replace(new RegExp("^" + country.dialCode), "").trim();
                              setPhone(onlyMobileNumber)
                            }}
                          // style={{ width: '100%' }}
                          // className='add-admin-telephone'
                          />
                        </div>
                        <div className="col-xl-1">
                          <Button
                            variant="danger"
                            onClick={() => {
                              removeButton(button.id)
                              setValue('call_phone_number_text', '')
                              setCountryCode('')
                              setPhone('')
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    );
                  case "copy_code":
                    return (
                      <div className="row mt-2" key={index}>
                        <div className="col-xl-2">
                          <Form.Label
                            className="mb-0"
                            style={{ width: "150px", lineHeight: "3" }}
                          >
                            Copy offer code
                          </Form.Label>
                        </div>
                        <div className="col-xl-3">
                          <Form.Control
                            placeholder="Copy Code"
                            disabled
                          />
                        </div>
                        <div className="col-xl-6">
                          <Form.Control placeholder="Enter offer code" maxLength={15} {...register('copy_offer_code_text')} />
                          <div className="d-flex">
                            <p className="text-danger small">
                              Note: To help us review your message template please add an
                              example for your offer code.
                            </p>

                            <small className="d-flex justify-content-end">{watch('copy_offer_code_text')?.length || 0}/15</small>
                          </div>
                        </div>
                        <div className="col-xl-1">
                          <Button
                            variant="danger"
                            onClick={() => {
                              removeButton(button.id);
                              setValue('copy_offer_code_text', '');
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    );
                  default:
                    return null;
                }
              })}

              {selectedPlaceholders.length > 0 && (
                <>
                  <h6 className="fw-bold mt-2">Sample Content</h6>
                  {selectedPlaceholders.map((ph) => (
                    <Form.Group className="mb-3" key={ph}>
                      {/* <Form.Label>Enter sample value for Body {`{{${ph}}}`}</Form.Label> */}
                      <Form.Control
                        maxLength={60}
                        placeholder={`Enter sample value for Body {{${ph}}}`}
                        value={placeholderValues[ph]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInputChange(ph, e.target.value)
                        }
                      />
                    </Form.Group>
                  ))}
                </>
              )}
              <div className="mt-3 d-flex gap-2">
                <Button variant="success" type="submit" disabled={submitLoading}>Save</Button>
                <Button variant="success">Save & Add New</Button>
                <Button variant="danger" onClick={() => router.push('/broadcasting/whatsapp-template/')}>Cancel</Button>
              </div>
            </Form>
          </Col>

          {/* Right Side Preview */}
          <Col md={4}>
            <Card className="p-3 bg-light">
              <div className="bg-success text-white p-2 rounded">
                <strong>Message Preview</strong>
              </div>
              <div className="p-3 border rounded mt-2 bg-white">
                <p>{message || "Your preview will appear here"}</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div >
  );
};

export default WhatsappTemplateForm;
