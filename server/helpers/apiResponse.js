module.exports.successResponse = function (res, msg) {
	let data = {
		status: 1,
		message: msg
	};
	return res.status(200).json(data);
};

module.exports.successResponseWithData = function (res, msg, data) {
	let resData = {
		status: 1,
		message: msg,
		data: data
	};
	return res.status(200).json(resData);
};

module.exports.ErrorResponse = function (res, msg) {
	let data = {
		status: 0,
		message: msg,
	};
	return res.status(500).json(data);
};

module.exports.notFoundResponse = function (res, msg) {
	let data = {
		status: 0,
		message: msg,
	};
	return res.status(404).json(data);
};

module.exports.validationErrorWithData = function (res, msg, data) {
	let resData = {
		status: 0,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};