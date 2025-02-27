import { useState } from "react";

interface TimeSelectModalProps {
    isOpen: boolean;
    onClose: () => void;
    startPeriod: string;
    setStartPeriod: (value: string) => void;
    startHour: string;
    setStartHour: (value: string) => void;
    startMinute: string;
    setStartMinute: (value: string) => void;
    endPeriod: string;
    setEndPeriod: (value: string) => void;
    endHour: string;
    setEndHour: (value: string) => void;
    endMinute: string;
    setEndMinute: (value: string) => void;
}

export const TimeSelectModal = ({
    isOpen,
    onClose,
    startPeriod,
    setStartPeriod,
    startHour,
    setStartHour,
    startMinute,
    setStartMinute,
    endPeriod,
    setEndPeriod,
    endHour,
    setEndHour,
    endMinute,
    setEndMinute,
}: TimeSelectModalProps) => {
    const [isStartPickerOpen, setIsStartPickerOpen] = useState(false);
    const [isEndPickerOpen, setIsEndPickerOpen] = useState(false);

    if (!isOpen) return null;

    // 스크롤 가능한 선택 목록 (3x3 그리드)
    const renderTimePicker = (
        period: string,
        setPeriod: (value: string) => void,
        hour: string,
        setHour: (value: string) => void,
        minute: string,
        setMinute: (value: string) => void
    ) => {
        const amPmOptions = period === "오전" ? ["", "오전", "오후"] : ["오전", "오후", ""];
        const minuteOptions = minute === "00" ? ["", "00", "30"] : ["00", "30", ""];
        const currentHour = parseInt(hour, 10);
        const hourOptions = [
            String(((currentHour + 10) % 12) + 1).padStart(2, "0"), // 이전 시간
            hour, // 현재 선택된 시간
            String((currentHour % 12) + 1).padStart(2, "0") // 다음 시간
        ];

        return (
            <div className="grid grid-cols-[2fr_1fr_1fr] items-center text-center gap-6">
                {/* 오전/오후 */}
                <div className="flex flex-col items-center justify-center h-[100px]">
                    {amPmOptions.map((p, idx) => (
                        <button
                            key={p}
                            className={`w-20 h-8 py-1 transition-all ease-in-out transform ${
                                period === p ? "text-primary-1 text-[14px] border-y border-[#EBEDEF]" : "text-[#94939B] text-[14px]"
                            }`}
                            onClick={() => setPeriod(p)}
                        >
                            {p}
                        </button> 
                    ))}
                </div>

                {/* 시 */}
                <div className="flex flex-col items-center justify-center h-[100px]">
                    {hourOptions.map((h) => (
                        <button
                            key={h}
                            className={`w-10 h-8 py-1 transition-all ${
                                hour === h ? "text-primary-1 text-[14px] border-y border-[#EBEDEF]" : "text-[#94939B] text-[14px]"
                            }`}
                            onClick={() => setHour(h)}
                        >
                            {h}
                        </button>
                    ))}
                </div>

                {/* 분 */}
                <div className="flex flex-col items-center justify-center h-[100px]">
                    {minuteOptions.map((m, idx) => (
                        <button
                            key={m}
                            className={`w-10 h-8 py-1 transition-all ${
                                minute === m ? "text-primary-1 text-[14px] border-y border-[#EBEDEF]" : "text-[#94939B] text-[14px]"
                            }`}
                            onClick={() => m && setMinute(m)}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/75 flex items-end justify-center">
            <div className="bg-white w-full max-w-[600px] h-[370px] rounded-t-[30px] p-8">

                {/* 헤더 */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-bold text-[16px]">선호 시간대</h2>
                    <button onClick={onClose}>
                        <img src="/assets/exit.png" alt="close" className="w-6 h-6" />
                    </button>
                </div>

                {/* 시작 시간 선택 */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <p className="text-[14px] text-[#94939B]">시작 시간</p>
                        <button
                            className="flex text-[16px] items-center"
                            onClick={() => {
                                setIsStartPickerOpen(!isStartPickerOpen);
                                setIsEndPickerOpen(false);
                            }}
                        >
                            {`${startPeriod} ${startHour}:${startMinute}`}
                            <img src="/assets/arrowdown.png" alt="arrowdown" className="w-6 h-6 ml-4" />
                        </button>
                    </div>

                    {isStartPickerOpen && (
                        <div className="flex flex-col items-center mt-6">
                            {renderTimePicker(
                                startPeriod,
                                setStartPeriod,
                                startHour,
                                setStartHour,
                                startMinute,
                                setStartMinute
                            )}
                        </div>
                    )}
                </div>

                {/* 종료 시간 선택 */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <p className="text-[14px] text-[#94939B]">종료 시간</p>
                        <button
                            className="flex text-[16px] items-center"
                            onClick={() => {
                                setIsEndPickerOpen(!isEndPickerOpen);
                                setIsStartPickerOpen(false);
                            }}
                        >
                            {`${endPeriod} ${endHour}:${endMinute}`}
                            <img src="/assets/arrowdown.png" alt="arrowdown" className="w-6 h-6 ml-4" />
                        </button>
                    </div>

                    {isEndPickerOpen && (
                        <div className="flex flex-col items-center mt-6">
                            {renderTimePicker(
                                endPeriod,
                                setEndPeriod,
                                endHour,
                                setEndHour,
                                endMinute,
                                setEndMinute
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};