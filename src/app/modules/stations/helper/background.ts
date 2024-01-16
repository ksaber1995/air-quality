export const getColorMapping = (value) => {
    if (value > 0 && value <= 50) {
        return '#00C800';
    } else if (value > 50 && value <= 100) {
        return '#FFE12D';
    }
    else if (value > 100 && value <= 150) {
        return '#FF7E00';
    }
    else if (value > 150 && value <= 200) {
        return '#FA0A00';
    }
    else if (value > 200 && value <= 300) {
        return '#8F3F97';
    }
    else if (value > 300) {
        return '#7E0023';
    }

    return 'rgb(231,231,231)' // not applicable

}
