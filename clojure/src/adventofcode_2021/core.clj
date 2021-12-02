(ns adventofcode-2021.core
  (:require [clojure.string :as str]))

(def line-split
  #(str/split %1 #"\n"))

(defn read-file-rows
  [filename row-func]
  (map row-func (line-split (slurp filename))))

(defn count-comparison
  [array comparefunc]
  (:count (reduce #(if (comparefunc (:last %1) %2)
                     {:last %2 :count (inc (:count %1))}
                     (assoc %1 :last %2))
                  {:last (first array) :count 0}
                  (rest array))))

(def t1-data (read-file-rows "../../inputs/input1.txt" read-string))

(defn day1a []
  (let [data t1-data]
    (count-comparison data #(< %1 %2))))

(defn day1b []
  (let [data (:array (reduce #(identity
                               {:array (concat (:array %1)
                                               [(+ %2 (reduce + (:last-two %1)))])
                                :last-two (concat (drop 1 (:last-two %1)) [%2])})
                             {:array [] :last-two (take 2 t1-data)}
                             (drop 2 t1-data)))]
    (count-comparison data #(< %1 %2))))
