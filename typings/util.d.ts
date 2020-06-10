/**
 * Simple way to avoid adding `| undefined` onto types.
 * 
 * Maybe may be a weird name for this. Maybe.
 */
declare type Maybe<T> = T | undefined;
