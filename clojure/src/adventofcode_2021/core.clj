(ns adventofcode-2021.core
  (:require [clojure.string :as str]))

(defn input-path [day]
  (str "../../inputs/input" day ".txt"))

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

(def t1-data (read-file-rows (input-path "1") read-string))

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

(def t2-data (read-file-rows (input-path "2")
                             #(let [row (str/split % #" ")] 
                                (hash-map :action (first row)
                                          :val (read-string (second row))))))

(defn day2a []
  (let [pos (reduce #(case (:action %2)
                    "forward" (assoc %1 :hori (+ (:hori %1) (:val %2)))
                    "down" (assoc %1 :depth (+ (:depth %1) (:val %2)))
                    "up" (assoc %1 :depth (- (:depth %1) (:val %2))))
                 {:depth 0 :hori 0}
                 t2-data)]
    (* (:depth pos) (:hori pos))))

(defn day2b []
  (let [pos (reduce #(case (:action %2)
                       "forward" (-> %1
                                     (assoc :hori (+ (:hori %1) (:val %2)))
                                     (assoc :depth (+ (:depth %1)
                                                      (* (:aim %1) (:val %2)))))
                       "down" (assoc %1 :aim (+ (:aim %1) (:val %2)))
                       "up" (assoc %1 :aim (- (:aim %1) (:val %2))))
                 {:depth 0 :hori 0 :aim 0}
                 t2-data)]
    (* (:depth pos) (:hori pos))))

