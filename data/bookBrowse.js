const getChaper = (url = '', date = {}, type = 'GET', header = {
}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: `https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=${url}`,
            data: date,
            header: header,
            dataType: 'json',         
        }).then((response) => {
            setTimeout(function() {
                uni.hideLoading();
            }, 200);
            let [error, res] = response;        
            resolve(res.data.data);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}

const getBookContent = (url = '', date = {}, type = 'GET', header = {
}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: `https://apis.netstart.cn/yunyuedu/reader/book/content.json?${url}`,
            data: date,
            header: header,
            dataType: 'json',         
        }).then((response) => {
            setTimeout(function() {
                uni.hideLoading();
            }, 200);
            let [error, res] = response;        
            resolve(res.data);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}

const getBookDetail = (url = '', date = {}, type = 'GET', header = {
}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: `https://apis.netstart.cn/yunyuedu/book/getsub.json?${url}`,
            data: date,
            header: header,
            dataType: 'json',         
        }).then((response) => {
            setTimeout(function() {
                uni.hideLoading();
            }, 200);
            let [error, res] = response;        
            resolve(res.data);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}

const getMBookDetail = (url = '', date = {}, type = 'GET', header = {
}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: `https://apis.netstart.cn/yunyuedu/reader/book/info.json?source_uuid=${url}`,
            data: date,
            header: header,
            dataType: 'json',         
        }).then((response) => {
            setTimeout(function() {
                uni.hideLoading();
            }, 200);
            let [error, res] = response;        
            resolve(res.data);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}

const allCollection = (boolen,id,title,url) => {
	let data = []
	data = uni.getStorageSync('collection') || []
	if(boolen && data[0]) {
		data = data.filter((item)=>{
			return item.id != id 
		})
		uni.setStorage({
			key: 'collection',
			data: data,
		})
	}else if(!boolen && data[0]){
		data = [...data,{'id':id,'title':title,'url':url}]
		uni.setStorage({
			key: 'collection',
			data: data,
		})
	}else if (!data[0]){
		data= [{'id':id,'title':title,'url':url}]
		uni.setStorage({
			key: 'collection',
			data: data,
		})
	}
}

const findCollection = (id) => {
	let boolen = true 
	let data = uni.getStorageSync('collection') || []
	data.forEach((item) => {
		if(item.id == id) {
			boolen = false
		}
	})
	return boolen
}
export default {getBookContent,getChaper,getBookDetail,getMBookDetail,allCollection,findCollection}