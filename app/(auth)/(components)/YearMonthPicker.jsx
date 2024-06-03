// components/ui/YearMonthDatePicker.js
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const YearMonthDatePicker = ({ onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - i); // 101 years back from current year
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleYearChange = (year) => {
    setSelectedYear(year);
    const newDate = new Date(year, selectedMonth, selectedDate.getDate());
    setSelectedDate(newDate);
    onChange(newDate);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    const newDate = new Date(selectedYear, month, selectedDate.getDate());
    setSelectedDate(newDate);
    onChange(newDate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <Select onValueChange={handleYearChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleMonthChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={index} value={index}>{month}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateChange}
        initialFocus
        month={new Date(selectedYear, selectedMonth)}
      />
    </div>
  );
};

export default YearMonthDatePicker;
