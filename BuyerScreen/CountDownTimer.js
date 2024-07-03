import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CountdownTimer = ({initialSeconds}) => {
    const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingSeconds(prevSeconds => {
                if (prevSeconds <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds) => {
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = parseInt(totalSeconds % 60);

        return {days, hours, minutes, seconds};
    };

    const {days, hours, minutes, seconds} = formatTime(remainingSeconds);

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>
                {days}d {hours}h {minutes}m {seconds}s
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CountdownTimer;
