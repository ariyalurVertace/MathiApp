import Config from "react-native-config";
import axios from "axios";
import apiService from "../common/config/axios";
import {checkIfInternetIsConnected} from "../common/functions/utils";

const baseUrl = Config.API_BASE_URL;

export const getOtp = async mobileNumber => {
    try {
        if (!(await checkIfInternetIsConnected())) {
            return "noInternet";

            // Store.dispatch(setSnackbarText(STRING_CONSTANTS.CHECK_INTERNET));
        }

        let response = await axios({
            method: "post",
            url: `${baseUrl}/user/getotp`,
            data: {
                Username: mobileNumber,
            },
        });
        let {statusCode} = response.data;
        if (statusCode === "200") {
            return "true";
        }
        if (statusCode === "404") {
            return "invalid";
        }
        return "false";
    } catch (error) {
        return "false";
    }
};

export const login = async (mobileNumber, otp) => {
    try {
        if (!(await checkIfInternetIsConnected())) {
            return "noInternet";
        }
        let response = await axios({
            method: "post",
            url: `${baseUrl}/user/validate`,
            data: {
                Username: mobileNumber,
                OTP: otp,
            },
        });

        let {statusCode} = response.data;
        if (statusCode === "200") {
            // logger(response, "i");

            return response.data.result;
        }

        return "false";
    } catch (error) {
        return "false";
    }
};

export const getAllFeedback = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `feedback/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const createFeedback = async data => {
    try {
        let response = await apiService({
            method: "put",
            url: `feedback/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getOneFeedback = async id => {
    try {
        let response = await apiService({
            method: "get",
            url: `feedback/${id}`,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getFeedbackType = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `feedbacktype/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getOfficesToTakeAction = async () => {
    try {
        let response = await apiService({
            method: "post",
            url: `office/officesabove/`,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const takeAction = async (id, data) => {
    try {
        let response = await apiService({
            method: "patch",
            url: `feedback/takeaction/${id}`,
            data: {EntityStateID: data},
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getFeedbackStatus = async () => {
    try {
        let response = await apiService({
            method: "post",
            url: `feedback/status`,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const fileUpload = async image => {
    try {
        const data = new FormData();
        data.append("filereq", {
            uri: image.path,
            type: image.mime,
            name: image.path.split("/")[image.path.split("/").length - 1],
        });
        let response = await apiService({
            method: "post",
            url: `fileupload/`,
            data,
        });
        return response.filereq;
    } catch (error) {
        return false;
    }
};

export const getEbeatLocation = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `ebeatlocation/scan/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getOneEbeatLocation = async id => {
    try {
        let response = await apiService({
            method: "get",
            url: `ebeatlocation/${id}`,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getAllEbeatLocation = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `ebeatlocation/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const ActivateLocation = async (id, data) => {
    try {
        let response = await apiService({
            method: "patch",
            url: `ebeatlocation/activate/${id}`,
            data,
        });
        // logger(response, "i");

        return true;
    } catch (error) {
        return false;
    }
};

export const CheckinLocation = async (id, data) => {
    try {
        let response = await apiService({
            method: "put",
            url: `ebeatlocation/checkin/${id}`,
            data,
        });
        // logger(response, "i");

        return true;
    } catch (error) {
        return false;
    }
};

export const checkin = async data => {
    try {
        let response = await apiService({
            method: "put",
            url: `beat_log`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getEbeatLocationTypes = async () => {
    try {
        let response = await apiService({
            method: "post",
            url: `ebeatlocationtype`,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const createEbeatLocation = async data => {
    try {
        let response = await apiService({
            method: "put",
            url: `ebeatlocation/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getcheckinList = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `ebeatlocation/history/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getCheckinLocationList = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `ebeatlocation/locations/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getCheckinPersonList = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `ebeatlocation/officers/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getAllDepartment = async () => {
    try {
        let response = await apiService({
            method: "post",
            url: `department/`,
            data: {
                pageNumber: 1,
                pageLimit: 10,
            },
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getAllOfficers = async (id, data) => {
    try {
        let response = await apiService({
            method: "post",
            url: `departmentofficial/${id}`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getProfession = async () => {
    try {
        let response = await apiService({
            method: "get",
            url: `profession`,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getAllRequest = async () => {
    try {
        let response = await axios({
            method: "post",
            url: `https://api.vertace.com:8047/volunteers/request`,
            headers: {
                token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlZGRmMjcxNDFiOTJkMjVjMGYzNjBkYiIsIlJvbGUiOiJWb2x1bnRlZXIifSwiaWF0IjoxNjI2OTU5MDM1LCJleHAiOjE2Mjk1NTEwMzV9.2Sy2SQs6ZJ_LUEz-JXBPRivN4rx2O1oci_5dqpqfw5M",
            },
        });
        let {statusCode} = response.data;

        if (statusCode === "200") {
            return response.data.result.CompletedRequests;
        }

        return [];
    } catch (error) {
        return "false";
    }
    // try {
    //     let response = await apiService({
    //         method: "post",
    //         url: `reachmevolunteer/`,
    //         data,
    //     });
    //     console.log(response);
    //     // logger(response, "i");

    //     return response;
    // } catch (error) {
    //     return false;
    // }
};
export const getRequestDetails = async requestId => {
    try {
        let response = await apiService({
            method: "get",
            url: `reachmerequest/${requestId}`,
        });

        return response;
    } catch (error) {
        return false;
    }
};

export const acceptRequest = async (requestID, Items) => {
    try {
        let response = await apiService({
            method: "post",
            url: `request/accept`,
            data: {Request: requestID, Items},
        });
        //    console.log(response);
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getAllOffice = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `office/${data}`,
            //      data,
        });
        // logger(response, "i");
        return response;
    } catch (error) {
        return false;
    }
};

export const getAllDesignation = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `designation/`,
            data,
        });
        // logger(response, "i");
        return response;
    } catch (error) {
        return false;
    }
};

export const getAllArea = async (data, department) => {
    try {
        let response = await apiService({
            method: "post",
            url: data ? `departmentarea/${data}` : `departmentarea/`,
            data: department,
        });
        // logger(response, "i");
        return response;
    } catch (error) {
        return false;
    }
};

export const getAllAreaList = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `area/${data}`,
        });
        return response;
    } catch (error) {
        return false;
    }
};
export const register = async data => {
    try {
        let response = await apiService({
            method: "put",
            url: `officer/register`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getOneOfficer = async id => {
    try {
        let response = await apiService({
            method: "get",
            url: `officer/${id}`,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const profileUpdate = async (id, data) => {
    try {
        let response = await apiService({
            method: "patch",
            url: `officer/${id}`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};
export const getAllPerson = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `welfareperson/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getAllSubtypes = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `subtype/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getDepartmentList = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `department/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getLineitems = async id => {
    try {
        let response = await apiService({
            method: "post",
            url: `welfarerequestlineitem/${id}`,
        });

        return response;
    } catch (error) {
        return false;
    }
};

export const getOneLineitem = async id => {
    try {
        let response = await apiService({
            method: "get",
            url: `welfarerequestlineitem/${id}`,
        });

        return response;
    } catch (error) {
        return false;
    }
};

export const createPerson = async data => {
    try {
        let response = await apiService({
            method: "put",
            url: `welfareperson/`,
            data,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const updatePerson = async (id, data) => {
    try {
        await apiService({
            method: "patch",
            url: `welfareperson/${id}`,
            data,
        });

        return true;
    } catch (error) {
        return false;
    }
};

export const getActionLog = async id => {
    try {
        let response = await apiService({
            method: "post",
            url: `welfarerequestlineitemlog/${id}`,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const getRemarksLog = async id => {
    try {
        let response = await apiService({
            method: "post",
            url: `welfarerequestlineitemremarks/${id}`,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const welfareRequestCreate = async data => {
    try {
        let response = await apiService({
            method: "put",
            url: `welfarerequestlineitemremarks/`,
            data,
        });
        // console.log(`repo${  JSON.stringify(response)}`);
        return response;
    } catch (error) {
        // console.log(`repo${  JSON.stringify(error)}`);
        return false;
    }
};

export const removeLineItm = async id => {
    try {
        let response = await apiService({
            method: "delete",
            url: `welfarerequestlineitem/${id}`,
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const getAllWelfareRequest = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `welfarerequest/`,
            data,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const getAllRequestType = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `requesttype/`,
            data,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const createRequest = async data => {
    try {
        let response = await apiService({
            method: "put",
            url: `welfarerequest/`,
            data,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const getsubtypes = async (id, data) => {
    try {
        let response = await apiService({
            method: "post",
            url: `requesttype/${id}`,
            data,
        });

        return response;
    } catch (error) {
        return false;
    }
};

export const createSubtype = async data => {
    try {
        let response = await apiService({
            method: "put",
            url: `requesttype`,
            data,
        });

        return response;
    } catch (error) {
        return false;
    }
};

export const getOfficiallist = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `welfaredepartmentposting/`,
            data,
        });

        return response;
    } catch (error) {
        return false;
    }
};

export const assignofficerToLinItem = async data => {
    try {
        let response = await apiService({
            method: "put",
            url: `welfarerequestlineitem/`,
            data,
        });

        return response;
    } catch (error) {
        return false;
    }
};
export const takeActionLineItem = async (id, data) => {
    try {
        let response = await apiService({
            method: "patch",
            url: `welfarerequestlineitem/takeaction/${id}`,
            data,
        });

        return response;
    } catch (error) {
        return false;
    }
};

export const assignofficerUpdateLinItem = async (id, data) => {
    try {
        let response = await apiService({
            method: "patch",
            url: `welfarerequestlineitem/${id}`,
            data,
        });

        return true;
    } catch (error) {
        return false;
    }
};

export const getOneRequest = async id => {
    try {
        let response = await apiService({
            method: "get",
            url: `welfarerequest/${id}`,
        });

        return response;
    } catch (error) {
        return false;
    }
};

export const getAllVolunteers = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `reachmevolunteer/`,
            data,
        });
        // logger(response, "i");

        return response;
    } catch (error) {
        return false;
    }
};

export const getOneVolunteers = async id => {
    try {
        let response = await apiService({
            method: "get",
            url: `reachmevolunteer/${id}`,
        });

        return response;
    } catch (error) {
        return false;
    }
};

export const takeActionOnVolunteer = async (id, data) => {
    try {
        let response = await apiService({
            method: "patch",
            url: `reachmevolunteer/takeaction/${id}`,
            data,
        });
        return true;
    } catch (error) {
        return false;
    }
};

export const getAllReachMeRequest = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `reachmerequest/`,
            data,
        });
        return response;
    } catch (error) {
        return false;
    }
};
export const CreateReachMeRequest = async data => {
    try {
        let response = await apiService({
            method: "put",
            url: `reachmerequest/`,
            data,
        });
        return response;
    } catch (error) {
        // console.log(`repo${  JSON.stringify(error)}`);
        return false;
    }
};

export const getAllReachMeRequestType = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `reachmerequesttype/`,
            data,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const getReachmeSubType = async id => {
    try {
        let response = await apiService({
            method: "post",
            url: `reachmerequesttype/${id}`,
            // data,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const getVolunteerHistory = async id => {
    try {
        let response = await apiService({
            method: "post",
            url: `reachmevolunteer/requests`,
            data,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const getAllVolunteerByRequest = async id => {
    try {
        let response = await apiService({
            method: "post",
            url: `reachmerequest/${id}`,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const getPoliceOfficers = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `officer/immediatebelowofficer`,
            data,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const getAllPoliceOfficers = async data => {
    try {
        let response = await apiService({
            method: "post",
            url: `officer/belowofficer`,
            data,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const verifyOfficer = async (id, data) => {
    try {
        let response = await apiService({
            method: "patch",
            url: `officer/verify/${id}`,
            data,
        });
        return response;
    } catch (error) {
        return false;
    }
};

export const deleteOfficer = async id => {
    try {
        let response = await apiService({
            method: "delete",
            url: `officer/${id}`,
        });
        return true;
    } catch (error) {
        return false;
    }
};
