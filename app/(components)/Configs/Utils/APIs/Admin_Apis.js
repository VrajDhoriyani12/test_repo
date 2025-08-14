import { adminApiHandler, adminApiHandlerWithFile, adminApiHandlerWithoutToken, adminDownloadApiHandler } from "../ApiHandler";
import EncryptionUtil from "../EncryptionUtils";
import { REQUEST_METHODS } from "../RequestMethods";

export const validateNoWhiteSpace = (value) => {
	return value.toString().trim() !== "";
}

export const cancelApiRequest = (controllers) => {
	for (const controller of controllers) {
		controller.abort();
	}
}

export const buildSearchUrl = (baseRoute, params) => {
	let url = baseRoute;
	let hasPreviousNonNullValue = false;

	if (params !== undefined) {
		Object.entries(params).forEach(([key, value]) => {
			if (value !== null && value !== undefined && value !== '') {
				const separator = hasPreviousNonNullValue ? '&' : '?';
				url += `${separator}${key}=${encodeURIComponent(value)}`;
				hasPreviousNonNullValue = true;
			}
		});
	}

	return url; // important!
};

export const SignUpApi = async (data) => {
	try {
		const response = await adminApiHandlerWithoutToken(
			REQUEST_METHODS.POST,
			`/api/admin/signup`,
			data,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const SignInApi = async (data) => {
	try {
		const response = await adminApiHandlerWithoutToken(
			REQUEST_METHODS.POST,
			`/api/admin/login`,
			data,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const getProfileApi = async () => {
	try {
		const response = await adminApiHandler(
			REQUEST_METHODS.GET,
			`/api/admin/get_profile`,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const updateProfileApi = async (body) => {
	try {
		const response = await adminApiHandlerWithFile(
			REQUEST_METHODS.PATCH,
			`/api/admin/update_profile`,
			body,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const updatePasswordApi = async (body) => {
	try {
		const response = await adminApiHandler(
			REQUEST_METHODS.PATCH,
			`/api/admin/change_password`,
			body,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const forgotPasswordApi = async (body) => {
	try {
		const response = await adminApiHandlerWithoutToken(
			REQUEST_METHODS.POST,
			`/api/admin/forgot_password`,
			body,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const resetPasswordApi = async (token, body) => {
	try {
		const response = await adminApiHandlerWithoutToken(
			REQUEST_METHODS.POST,
			`/api/admin/reset_password/${token}`,
			body,
		);
		return response
	} catch (error) {
		return error;
	}
}

// language
export const getLanguageApi = async (page) => {
	try {
		const response = await adminApiHandler(
			REQUEST_METHODS.GET,
			`/api/admin/language/all?page=${page}`,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const searchLanguageApi = async (search, page) => {
	try {
		const response = await adminApiHandler(
			REQUEST_METHODS.GET,
			`/api/admin/language/all?name=${search}&page=${page}`,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const getOneLanguageApi = async (id) => {
	try {
		const response = await adminApiHandler(
			REQUEST_METHODS.GET,
			`/api/admin/language/get_one/${id}`,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const addLanguageApi = async (body) => {
	try {
		const response = await adminApiHandler(
			REQUEST_METHODS.POST,
			`/api/admin/language/store`,
			body,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const addLanguageInBilkApi = async (body) => {
	try {
		const response = await adminApiHandlerWithFile(
			REQUEST_METHODS.POST,
			`/api/admin/language/bulk_data`,
			body,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const updateLanguageApi = async (id, body) => {
	try {
		const response = await adminApiHandler(
			REQUEST_METHODS.PATCH,
			`/api/admin/language/update/${id}`,
			body,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const deleteLanguageApi = async (id) => {
	try {
		const response = await adminApiHandler(
			REQUEST_METHODS.DELETE,
			`/api/admin/language/delete/${id}`,
			{},
		);
		return response
	} catch (error) {
		return error;
	}
}

export const activeLanguageApi = async () => {
	try {
		const response = await adminApiHandler(
			REQUEST_METHODS.GET,
			`/api/admin/language/all_active`,
			{},
		);
		return response
	} catch (error) {
		return error;
	}
}

// whatsapp template
export const whatsappTemplateApi = async (page) => {
	try {
		const response = await adminApiHandler(
			REQUEST_METHODS.GET,
			`/api/admin/whatsappTemplate/all?page=${page}`,
			{},
		);
		return response
	} catch (error) {
		return error;
	}
}

export const searchWhatsappTemplateApi = async (search, category, headerTemplateType, language, status, page) => {
	try {
		const response = await adminApiHandler(
			REQUEST_METHODS.GET,
			`/api/admin/whatsappTemplate/all?template_name=${search}&category=${category}&header_template_type_id=${headerTemplateType}&language_id=${language}&status=${status}&page=${page}`,
			{},
		);
		return response
	} catch (error) {
		return error;
	}
}

export const addWhatsappTemplateApi = async (body) => {
	try {
		const response = await adminApiHandlerWithFile(
			REQUEST_METHODS.POST,
			`/api/admin/whatsappTemplate/create`,
			body,
		);
		return response
	} catch (error) {
		return error;
	}
}

export const getOneWhatsappTemplateApi = async (id) => {
	try {
		const response = await adminApiHandler(
			REQUEST_METHODS.GET,
			`/api/admin/whatsappTemplate/get_one/${id}`,
			{},
		);
		return response
	} catch (error) {
		return error;
	}
}